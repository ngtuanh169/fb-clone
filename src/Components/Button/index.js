import { Link, NavLink } from "react-router-dom";
function Button({
    children,
    href,
    to,
    _className,
    style = {},
    hoverText,
    classHoverText = "",
    hoverBottom = false,
    cursorDefault = false,
    cursor = "",
    onClick,
}) {
    let Comp = "button";
    const _props = {};
    const styles = { ...style };
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
            className={`group/button ${
                cursorDefault ? "" : "active:scale-[0.97]"
            } ${_className} ${classNames}`}
            {..._props}
        >
            {hoverText && !cursorDefault && (
                <span
                    className={`w-max p-2 text-[13px] rounded-md text-white bg-matteBlack absolute ${
                        hoverBottom ? "bottom-[-40px]" : "top-[-40px]"
                    } ${classHoverText} opacity-0 invisible group-hover/button:opacity-100 group-hover/button:visible`}
                >
                    {hoverText}
                </span>
            )}

            {children}
        </Comp>
    );
}

export default Button;
