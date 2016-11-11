import { createElement } from "react";
import { DOM } from "react";

export interface OnClickProps {
    microflow?: string;
    guid?: string;
    applyto?: string;
    caller?: string;
    widgetId?: string;
    mxform?: string;
}

export interface BadgeProps {
    label?: string;
    val?: string;
    bootstrapStyle?: string;
    className?: string;
    MicroflowProps?: OnClickProps;
    badgeType?: string;
    // "btn" | "label" | "badge"
}

export function BadgeComponent(props: BadgeProps) {
    let badgeClass: string;
    badgeClass = props.badgeType;

    if (props.badgeType === "btn") {
        badgeClass += " btn-" + props.bootstrapStyle;
        return createElement(ButtonBadgeItem, {
            className: badgeClass,
            label: props.label,
            val: props.val,
            MicroflowProps: props.MicroflowProps
        });
    } else {
        badgeClass += " label-" + props.bootstrapStyle;
        return createElement(BadgeItem, {
            className: badgeClass,
            label: props.label,
            val: props.val,
            MicroflowProps: props.MicroflowProps
        });
    }
}

export function BadgeItem(props: BadgeProps) {
    return (
        DOM.div({
            className: "badge-link",
            onClick: () => {
                onClickMF(props);
            }
        }, DOM.span({ className: "badge-text" }, props.label),
            DOM.span({ className: props.className }, props.val))
    );
}
function onClickMF(props: BadgeProps) {
    return (
        mx.data.action({
            error: (error) => {
                mx.ui.error(`Error while executing MicroFlow: 
                    ${props.MicroflowProps.microflow}: ${error.message}`);
            },
            params: {
                actionname: props.MicroflowProps.microflow,
                applyto: "selection",
                guids: [ props.MicroflowProps.guid ]
            }
        })
    );
}

export function ButtonBadgeItem(props: BadgeProps) {
    return (
        DOM.button({
            className: props.className, itemType: "button",
            onClick: () => {
                    onClickMF(props);
                }
            },
            DOM.span({ className: "badge-text" }, props.label),
            DOM.span({ className: "badge" }, props.val)

        )
        );
}
