(() => {
	const KEY = "font-preference";
	const DEFAULT_FONT = "system";
	const MISANS_FONT = '"MiSans", system-ui, -apple-system, "Segoe UI", Roboto, "PingFang SC", "Microsoft YaHei", sans-serif';

	const fontBtn = document.getElementById("font-btn");
	if (!fontBtn) return;

	const applyFont = (font) => {
		document.documentElement.setAttribute("data-font", font);
		if (font === "misans") {
			document.body.style.fontFamily = MISANS_FONT;
		} else {
			document.body.style.fontFamily = "";
		}
		fontBtn.setAttribute("aria-pressed", font === "misans" ? "true" : "false");
	};

	applyFont(localStorage.getItem(KEY) || DEFAULT_FONT);

	fontBtn.addEventListener("click", () => {
		const current = document.documentElement.getAttribute("data-font") || DEFAULT_FONT;
		const next = current === "misans" ? DEFAULT_FONT : "misans";
		applyFont(next);
		localStorage.setItem(KEY, next);
	});
})();
