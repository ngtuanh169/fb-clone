import { Link, NavLink } from "react-router-dom";
function Button({
    children,
    href,
    to,
    _className,
    hoverText,
    classHoverText = "",
    hoverBottom = false,
    cursorDefault = false,
    cursor = "",
    onClick,
}) {
    let Comp = "button";
    const _props = {};
    const styles = {};
    let classNames = "";
    if (to) {
        Comp = Link;
        _props.to = to;
    }
    if (href) {
        Comp = "a";
        _props.href = href;
    }
    if (onClick) {
        _props.onClick = onClick;
    }
    if (hoverText) {
        styles.position = "relative";
    }
    if (cursorDefault) {
        classNames = classNames + "cursor-default opacity-60";
    }
    if (cursor) {
        classNames = classNames + cursor;
    }
    return (
        <Comp
            style={styles}
            className={`group active:scale-[0.97] ${_className} ${classNames}`}
            {..._props}
        >
            {hoverText && (
                <span
                    className={`w-max p-2 text-[13px] rounded-md text-white bg-matteBlack absolute ${
                        hoverBottom ? "bottom-[-40px]" : "top-[-40px]"
                    } ${classHoverText} opacity-0 invisible group-hover:opacity-100 group-hover:visible`}
                >
                    {hoverText}
                </span>
            )}

            {children}
        </Comp>
    );
}

export default Button;
