import { ModeToggle } from "./mode-toggle";

const Header = () => {
    return (
        <div className="flex h-14 w-full flex-row justify-end items-center border-b border-border">
            <ModeToggle />
        </div>
    )
}

export default Header