interface ViewSwitcherProps {
    view: "day" | "week" | "month" | "year";
    onViewChange: (view: "day" | "week" | "month" | "year") => void;
}
export default function ViewSwitcher({ view, onViewChange }: ViewSwitcherProps): import("react/jsx-runtime").JSX.Element;
export {};
