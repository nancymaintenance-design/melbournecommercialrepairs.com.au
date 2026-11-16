/* Ellis Services Group — commercial-sector explorer. No runtime dependencies. */
(function (global) {
  "use strict";

  const instances = new WeakMap();
  let instanceNumber = 0;
  let keyboardOwner = null;
  const COPY = {
    zh: {
      eyebrow: "商业场景 / MELBOURNE",
      heading: "我们服务的商业物业",
      intro: "点击建筑编号，找到适合您物业的维护服务。",
      explore: "探索 8 类商业空间",
      close: "收起服务卡片",
      services: "选择需要了解的服务",
      details: "查看对应维护",
      hint: "选择一个建筑编号，查看场景与维护项目。",
      unavailable: "链接待配置",
      selected: "当前场景：",
      sheet: "场景与维护服务",
      image: "墨尔本八类商业物业的三维建筑场景"
    },
    en: {
      eyebrow: "COMMERCIAL PLACES / MELBOURNE",
      heading: "Care for every commercial space.",
      intro: "Choose a building to discover the services for your property.",
      explore: "Explore all 8 sectors",
      close: "Close service card",
      services: "Explore maintenance services",
      details: "Explore this sector",
      hint: "Choose a numbered building to explore its maintenance services.",
      unavailable: "Link not configured",
      selected: "Selected sector: ",
      sheet: "Sector and maintenance services",
      image: "A three-dimensional campus of eight Melbourne commercial property types"
    }
  };

  function mount(root, options) {
    if (!root || root.nodeType !== 1) throw new TypeError("EllisSectorExplorer.mount requires a DOM element.");
    const opts = Object.assign({}, options);
    if (!Array.isArray(opts.sectors) || !opts.sectors.length) throw new TypeError("Provide at least one sector in options.sectors.");
    const sectors = opts.sectors.map(function (sector) {
      if (!sector.id || !sector.point) throw new TypeError("Each sector requires an id and normalized point coordinates.");
      return Object.assign({}, sector, {
        id: String(sector.id),
        point: { x: clamp(Number(sector.point.x) || 0, 0, 1), y: clamp(Number(sector.point.y) || 0, 0, 1) },
        services: Array.isArray(sector.services) ? sector.services : []
      });
    });
    const byId = new Map(sectors.map(function (sector) { return [sector.id, sector]; }));
    if (byId.size !== sectors.length) throw new TypeError("Sector ids must be unique.");
    if (instances.has(root)) instances.get(root).destroy();

    const doc = root.ownerDocument;
    const win = doc.defaultView;
    const uid = "esx-" + (++instanceNumber);
    const abort = new win.AbortController();
    const listenerOptions = { signal: abort.signal };
    const mobileQuery = win.matchMedia("(max-width: 900px)");
    const initialId = String(opts.selectedId || "04");
    let activeId = byId.has(initialId) ? initialId : sectors[0].id;
    let language = opts.language === "en" ? "en" : "zh";
    let opened = Boolean(opts.initiallyOpen);
    let destroyed = false;
    let frame = 0;
    let resizeObserver;
    let focusAfterLayout = false;
    const hadRootClass = root.classList.contains("esx");
    root.classList.add("esx");

    function el(tag, className, text) {
      const node = doc.createElement(tag);
      if (className) node.className = className;
      if (text !== undefined) node.textContent = text;
      return node;
    }
    function text(value) {
      if (typeof value === "string") return value;
      return value && (value[language] || value.zh || value.en) || "";
    }
    function copy(key) { return COPY[language][key]; }
    function listen(target, name, handler, extra) {
      target.addEventListener(name, handler, Object.assign({}, listenerOptions, extra));
    }
    function link(kind, key, sector, label, className) {
      let href = null;
      if (typeof opts.resolveHref === "function") {
        href = opts.resolveHref({ kind: kind, key: key, lang: language, sector: sector });
      }
      const usable = safeHref(href, doc.baseURI);
      const node = el(usable ? "a" : "span", className);
      const labelNode = el("span", "esx-link-label", label);
      const arrow = el("span", "esx-link-arrow", "↗");
      arrow.setAttribute("aria-hidden", "true");
      node.append(labelNode, arrow);
      node.dataset.routeKind = kind;
      node.dataset.routeKey = key || "";
      if (usable) node.href = usable;
      else {
        node.classList.add("is-unmapped");
        node.setAttribute("aria-disabled", "true");
        node.title = copy("unavailable");
      }
      return node;
    }

    const section = el("section", "esx-section");
    section.setAttribute("aria-labelledby", uid + "-heading");
    const heading = el("header", "esx-heading");
    const headingText = el("div", "esx-heading-text");
    const eyebrow = el("p", "esx-eyebrow");
    const headingTitle = el("h2", "esx-heading-title");
    headingTitle.id = uid + "-heading";
    const headingCopy = el("p", "esx-heading-copy");
    const allLinkHolder = el("div", "esx-all-link-holder");
    headingText.append(eyebrow, headingTitle, headingCopy);
    heading.append(headingText, allLinkHolder);

    const layout = el("div", "esx-layout");
    const stage = el("div", "esx-stage");
    const sceneImage = el("img", "esx-scene-img");
    sceneImage.src = opts.sceneSrc || "";
    sceneImage.decoding = "async";
    sceneImage.draggable = false;
    const pins = el("div", "esx-pins");
    const pinMap = new Map();
    const mobilePinMap = new Map();
    const picker = el("div", "esx-mobile-picker");
    const hint = el("p", "esx-hint");

    sectors.forEach(function (sector) {
      const pin = el("button", "esx-pin", sector.id);
      pin.type = "button";
      pin.dataset.sectorId = sector.id;
      pin.style.left = (sector.point.x * 100) + "%";
      pin.style.top = (sector.point.y * 100) + "%";
      pin.setAttribute("aria-controls", uid + "-popover");
      pinMap.set(sector.id, pin);
      pins.append(pin);
      const mobilePin = el("button", "esx-mobile-option");
      mobilePin.type = "button";
      mobilePin.dataset.sectorId = sector.id;
      mobilePin.setAttribute("aria-controls", uid + "-popover");
      mobilePin.append(el("span", "esx-mobile-option-number", sector.id), el("span", "esx-mobile-option-label"));
      mobilePinMap.set(sector.id, mobilePin);
      picker.append(mobilePin);
    });

    const connector = el("div", "esx-connector");
    connector.setAttribute("aria-hidden", "true");
    const popover = el("div", "esx-popover");
    popover.id = uid + "-popover";
    popover.setAttribute("role", "region");
    popover.setAttribute("aria-labelledby", uid + "-popover-title");
    const popoverHead = el("div", "esx-popover-head");
    const popoverNumber = el("span", "esx-popover-number");
    const popoverTitle = el("h3", "esx-popover-title");
    popoverTitle.id = uid + "-popover-title";
    const closeButton = el("button", "esx-close", "×");
    closeButton.type = "button";
    popoverHead.append(popoverNumber, popoverTitle, closeButton);
    const popoverBody = el("div", "esx-popover-body");
    const mobileOverview = el("div", "esx-mobile-overview");
    const mobilePreview = el("div", "esx-preview");
    mobilePreview.setAttribute("aria-hidden", "true");
    const mobileDescription = el("p", "esx-description");
    mobileOverview.append(mobilePreview, mobileDescription);
    const serviceLabel = el("p", "esx-service-label");
    const serviceLinks = el("div", "esx-service-links");
    const mobileCTA = el("div", "esx-mobile-cta");
    popoverBody.append(mobileOverview, serviceLabel, serviceLinks, mobileCTA);
    popover.append(popoverHead, popoverBody);
    stage.append(sceneImage, pins, connector, popover);

    const aside = el("aside", "esx-aside");
    aside.setAttribute("aria-labelledby", uid + "-detail-title");
    const preview = el("div", "esx-preview");
    preview.setAttribute("aria-hidden", "true");
    const number = el("span", "esx-number");
    const detailTitle = el("h3", "esx-detail-title");
    detailTitle.id = uid + "-detail-title";
    const description = el("p", "esx-description");
    const tags = el("div", "esx-tags");
    const asideCTA = el("div", "esx-cta-holder");
    aside.append(preview, number, detailTitle, description, tags, asideCTA);
    layout.append(stage, aside);
    const status = el("p", "esx-sr-only esx-status");
    status.setAttribute("role", "status");
    status.setAttribute("aria-live", "polite");
    status.setAttribute("aria-atomic", "true");
    section.append(heading, layout, picker, hint, status);
    root.append(section);

    function render(notify) {
      if (destroyed) return;
      const sector = byId.get(activeId);
      const title = text(sector.title);
      section.lang = language === "zh" ? "zh-CN" : "en-AU";
      section.dataset.selected = activeId;
      section.dataset.open = String(opened);
      section.classList.toggle("is-mobile", mobileQuery.matches);
      section.classList.toggle("has-open-card", opened);
      eyebrow.textContent = copy("eyebrow");
      headingTitle.textContent = copy("heading");
      headingCopy.textContent = copy("intro");
      allLinkHolder.replaceChildren(link("all-sectors", "all", null, copy("explore"), "esx-all-link"));
      sceneImage.alt = text(opts.sceneAlt) || copy("image");
      hint.textContent = copy("hint");
      closeButton.setAttribute("aria-label", copy("close"));
      picker.setAttribute("aria-label", copy("sheet"));

      sectors.forEach(function (item) {
        const selected = item.id === activeId;
        const isOpen = selected && opened;
        [pinMap.get(item.id), mobilePinMap.get(item.id)].forEach(function (button) {
          button.classList.toggle("is-active", selected);
          button.classList.toggle("is-open", isOpen);
          button.setAttribute("aria-expanded", String(isOpen));
          button.setAttribute("aria-pressed", String(selected));
          button.setAttribute("aria-label", item.id + " " + text(item.title));
        });
        mobilePinMap.get(item.id).querySelector(".esx-mobile-option-label").textContent = text(item.title);
      });

      number.textContent = activeId;
      detailTitle.textContent = title;
      description.textContent = text(sector.description);
      const previewSource = sector.imageSrc || opts.sceneSrc || "";
      const imagePoint = sector.imagePosition || sector.point;
      [preview, mobilePreview].forEach(function (node) {
        node.style.backgroundImage = "url(" + JSON.stringify(previewSource) + ")";
        node.style.backgroundPosition = (clamp(Number(imagePoint.x), 0, 1) * 100) + "% " + (clamp(Number(imagePoint.y), 0, 1) * 100) + "%";
        node.dataset.sectorId = activeId;
      });
      tags.replaceChildren.apply(tags, sector.services.map(function (service) {
        return el("span", "esx-tag", text(service.label));
      }));
      asideCTA.replaceChildren(link("sector", sector.key, sector, copy("details"), "esx-cta"));
      popoverNumber.textContent = activeId;
      popoverTitle.textContent = text(sector.popupTitle) || title;
      mobileDescription.textContent = text(sector.description);
      serviceLabel.textContent = copy("services");
      serviceLinks.replaceChildren.apply(serviceLinks, sector.services.map(function (service) {
        return link("service", service.key, sector, text(service.label), "esx-service-link");
      }));
      mobileCTA.replaceChildren(link("sector", sector.key, sector, copy("details"), "esx-cta"));
      popover.setAttribute("role", mobileQuery.matches ? "dialog" : "region");
      renderOpenState();
      status.textContent = copy("selected") + title;
      if (notify && typeof opts.onSelect === "function") opts.onSelect(getState());
    }

    function renderOpenState() {
      // Closing must not replace the outside link the user is about to activate.
      section.dataset.open = String(opened);
      section.classList.toggle("has-open-card", opened);
      sectors.forEach(function (sector) {
        const isOpen = sector.id === activeId && opened;
        [pinMap.get(sector.id), mobilePinMap.get(sector.id)].forEach(function (button) {
          button.classList.toggle("is-open", isOpen);
          button.setAttribute("aria-expanded", String(isOpen));
        });
      });
      popover.hidden = !opened;
      connector.hidden = !opened || mobileQuery.matches;
      if (opened) {
        popover.style.visibility = "hidden";
        schedulePosition();
      } else {
        popover.style.visibility = "";
        if (frame) win.cancelAnimationFrame(frame);
        frame = 0;
      }
    }

    function schedulePosition() {
      if (destroyed || !opened || frame) return;
      frame = win.requestAnimationFrame(function () {
        frame = 0;
        if (destroyed || !opened) return;
        positionPopover();
        popover.style.visibility = "";
        if (focusAfterLayout) {
          focusAfterLayout = false;
          closeButton.focus({ preventScroll: true });
        }
      });
    }

    function positionPopover() {
      if (mobileQuery.matches) {
        popover.style.left = "";
        popover.style.top = "";
        popover.style.maxWidth = "";
        popover.dataset.placement = "sheet";
        connector.hidden = true;
        return;
      }
      const stageRect = stage.getBoundingClientRect();
      const width = stageRect.width;
      const height = stageRect.height;
      if (!width || !height) return;
      const margin = 12;
      popover.style.maxWidth = Math.max(200, width - margin * 2) + "px";
      const box = popover.getBoundingClientRect();
      const cardWidth = box.width;
      const cardHeight = box.height;
      const sector = byId.get(activeId);
      const target = { x: sector.point.x * width, y: sector.point.y * height };
      const pinRects = Array.from(pinMap, function (entry) {
        const rect = entry[1].getBoundingClientRect();
        return {
          id: entry[0], x: rect.left - stageRect.left - 8, y: rect.top - stageRect.top - 8,
          width: rect.width + 16, height: rect.height + 16
        };
      });
      const gap = 36;
      const candidates = [
        { x: target.x - cardWidth / 2, y: target.y - cardHeight - gap, placement: "above" },
        { x: target.x + gap, y: target.y - cardHeight / 2, placement: "right" },
        { x: target.x - cardWidth - gap, y: target.y - cardHeight / 2, placement: "left" },
        { x: target.x - cardWidth / 2, y: target.y + gap, placement: "below" },
        { x: target.x - cardWidth + 36, y: target.y - cardHeight - gap, placement: "above" },
        { x: target.x - 36, y: target.y - cardHeight - gap, placement: "above" }
      ];
      const xs = [margin, width - cardWidth - margin, target.x - cardWidth / 2];
      const ys = [margin, height - cardHeight - margin, target.y - cardHeight / 2];
      pinRects.forEach(function (rect) {
        xs.push(rect.x - cardWidth - 4, rect.x + rect.width + 4);
        ys.push(rect.y - cardHeight - 4, rect.y + rect.height + 4);
      });
      xs.forEach(function (x) { ys.forEach(function (y) { candidates.push({ x: x, y: y, placement: "auto" }); }); });
      let best;
      candidates.forEach(function (candidate, index) {
        const x = clamp(candidate.x, margin, Math.max(margin, width - cardWidth - margin));
        const y = clamp(candidate.y, margin, Math.max(margin, height - cardHeight - margin));
        const rect = { x: x, y: y, width: cardWidth, height: cardHeight };
        let score = index * 0.015;
        pinRects.forEach(function (pin) {
          score += overlap(rect, pin) * (pin.id === activeId ? 200 : 10);
        });
        const nearestX = clamp(target.x, x, x + cardWidth);
        const nearestY = clamp(target.y, y, y + cardHeight);
        score += Math.hypot(nearestX - target.x, nearestY - target.y) * 1.4;
        score += (Math.abs(x - candidate.x) + Math.abs(y - candidate.y)) * 0.08;
        if (!best || score < best.score) best = { x: x, y: y, score: score, placement: candidate.placement };
      });
      popover.style.left = Math.round(best.x) + "px";
      popover.style.top = Math.round(best.y) + "px";
      popover.dataset.placement = best.placement;

      // A short connector ends at the nearest card edge and starts outside the pin.
      const endX = clamp(target.x, best.x, best.x + cardWidth);
      const endY = clamp(target.y, best.y, best.y + cardHeight);
      const dx = endX - target.x;
      const dy = endY - target.y;
      const distance = Math.hypot(dx, dy);
      const radius = Math.max(18, pinMap.get(activeId).getBoundingClientRect().width / 2);
      const startOffset = Math.min(radius, distance);
      const angle = Math.atan2(dy, dx);
      connector.style.left = (target.x + Math.cos(angle) * startOffset) + "px";
      connector.style.top = (target.y + Math.sin(angle) * startOffset) + "px";
      connector.style.width = Math.max(0, distance - startOffset) + "px";
      connector.style.transform = "rotate(" + angle + "rad)";
      connector.hidden = distance <= radius;
    }

    function getState() { return { id: activeId, open: opened, language: language }; }
    function select(id, selectionOptions) {
      if (destroyed) return;
      const nextId = String(id);
      if (!byId.has(nextId)) throw new RangeError("Unknown Ellis sector: " + nextId);
      activeId = nextId;
      opened = !selectionOptions || selectionOptions.open !== false;
      if (opened) keyboardOwner = api;
      render(true);
    }
    function close(returnFocus) {
      if (destroyed || !opened) return;
      opened = false;
      focusAfterLayout = false;
      if (keyboardOwner === api) keyboardOwner = null;
      renderOpenState();
      if (typeof opts.onSelect === "function") opts.onSelect(getState());
      if (returnFocus) {
        const focusTarget = mobileQuery.matches ? mobilePinMap.get(activeId) : pinMap.get(activeId);
        focusTarget.focus({ preventScroll: true });
      }
    }
    function setLanguage(nextLanguage) {
      if (destroyed) return;
      const next = nextLanguage === "en" ? "en" : "zh";
      if (next === language) return;
      language = next;
      render(true);
    }
    function onPinClick(event) {
      const button = event.target.closest("button[data-sector-id]");
      if (!button || !section.contains(button)) return;
      const nextId = button.dataset.sectorId;
      if (nextId === activeId && opened) close(false);
      else {
        focusAfterLayout = mobileQuery.matches || event.detail === 0;
        select(nextId, { open: true });
      }
    }

    listen(pins, "click", onPinClick);
    listen(picker, "click", onPinClick);
    listen(closeButton, "click", function () { close(true); });
    listen(doc, "pointerdown", function (event) {
      if (!opened) return;
      const path = event.composedPath ? event.composedPath() : [];
      const inPopover = path.includes(popover) || popover.contains(event.target);
      const pin = event.target.closest && event.target.closest("button[data-sector-id]");
      if (!inPopover && !(pin && section.contains(pin))) close(false);
    });
    listen(doc, "keydown", function (event) {
      if (event.key === "Escape" && !event.defaultPrevented && opened && (root.contains(doc.activeElement) || keyboardOwner === api)) {
        event.preventDefault();
        close(true);
      }
    });
    listen(sceneImage, "load", schedulePosition);
    listen(mobileQuery, "change", function () { render(false); });
    listen(win, "resize", schedulePosition, { passive: true });
    if (win.ResizeObserver) {
      resizeObserver = new win.ResizeObserver(schedulePosition);
      resizeObserver.observe(stage);
      resizeObserver.observe(popover);
    }
    function destroy() {
      if (destroyed) return;
      destroyed = true;
      abort.abort();
      if (resizeObserver) resizeObserver.disconnect();
      if (frame) win.cancelAnimationFrame(frame);
      if (keyboardOwner === api) keyboardOwner = null;
      section.remove();
      if (!hadRootClass) root.classList.remove("esx");
      if (instances.get(root) === api) instances.delete(root);
    }

    const api = Object.freeze({ select: select, close: function () { close(popover.contains(doc.activeElement)); }, setLanguage: setLanguage, getState: getState, destroy: destroy });
    instances.set(root, api);
    if (opened) keyboardOwner = api;
    render(false);
    return api;
  }

  function clamp(value, min, max) { return Math.min(max, Math.max(min, value)); }
  function overlap(a, b) {
    const width = Math.max(0, Math.min(a.x + a.width, b.x + b.width) - Math.max(a.x, b.x));
    const height = Math.max(0, Math.min(a.y + a.height, b.y + b.height) - Math.max(a.y, b.y));
    return width * height;
  }
  function safeHref(value, base) {
    if (typeof value !== "string" || !value.trim() || value.trim() === "#") return null;
    try {
      const url = new URL(value, base);
      return ["http:", "https:", "file:", "mailto:", "tel:"].includes(url.protocol) ? value : null;
    } catch (_) { return null; }
  }

  global.EllisSectorExplorer = Object.freeze({ mount: mount, version: "1.0.0" });
})(typeof globalThis !== "undefined" ? globalThis : this);
