import { KailendarView } from '../../utils/constants';
interface CommonHeaderProps {
    view: KailendarView;
    setView: (view: KailendarView) => void;
    currentDate: Date;
    setCurrentDate: (date: Date) => void;
}
export default function CommonHeader({ view, setView, currentDate, setCurrentDate, }: CommonHeaderProps): import("react/jsx-runtime").JSX.Element;
export {};
