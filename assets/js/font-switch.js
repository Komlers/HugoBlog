(() => {
	const KEY = "font-preference";
	const DEFAULT_FONT = "system";

	const fontBtn = document.getElementById("font-btn");
	if (!fontBtn) return;

	const applyFont = (font) => {
		document.documentElement.setAttribute("data-font", font);
		fontBtn.setAttribute("aria-pressed", font === "misans" ? "true" : "false");
	};

	// Avoid FOUC: apply saved preference as early as possible
	applyFont(localStorage.getItem(KEY) || DEFAULT_FONT);

	fontBtn.addEventListener("click", () => {
		const current = document.documentElement.getAttribute("data-font") || DEFAULT_FONT;
		const next = current === "misans" ? DEFAULT_FONT : "misans";
		applyFont(next);
		localStorage.setItem(KEY, next);
	});
})();
