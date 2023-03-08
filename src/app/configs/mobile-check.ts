export const BREAKPOINTS = {
	xs: { max: 425 },
	sm: { min: 426, max: 576 },
	md: { min: 577, max: 767 },
	lg: { min: 768, max: 1024 },
	xl: { min: 1025, max: 1440 },
	xxl: { min: 1441 },
};

export function isMobile() {
	const width =
		window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
	return width <= BREAKPOINTS.md.max;
}
