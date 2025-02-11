/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import type { MouseEventHandler } from "react";

import ArrowDown from "../../assets/icons/arrow-down.svg";
import styles from "./styles/Select.module.scss";
import { Status } from "../../types";

export type Option = {
    status: string;
};
type OptionProps = {
    option: Option;
    onClick: (value: Option["status"], name?: string) => void;
    selected: Status;
    name?: string
};
const OptionEl = (props: OptionProps) => {

    const {
        option: { status },
        onClick,
        name
    } = props;
    const optionRef = useRef<HTMLLIElement>(null);

    const handleClick = (
        clickedValue: Option["status"]
    ): MouseEventHandler<HTMLLIElement> => () => {
        if (name) {
            onClick(clickedValue, name);

        } else {
            onClick(clickedValue);

        }
    };

    useEffect(() => {
        const option = optionRef.current;
        if (!option) return;
        const handleEnterKeyDown = (event: KeyboardEvent) => {
            if (document.activeElement === option && event.key === "Enter") {
                onClick(status, name);
            }
        };

        option.addEventListener("keydown", handleEnterKeyDown);
        return () => {
            option.removeEventListener("keydown", handleEnterKeyDown);
        };
    }, [status, onClick]);

    return (
        <li
            className={styles.option}
            value={status}
            onClick={handleClick(status)}
            tabIndex={0}
            data-testid={`select-option-${status}`}
            ref={optionRef}
        >
            {status}
        </li>
    );
};

type SelectProps = {
    content?: string;
    selected?: Option | undefined;
    options: Option[];
    placeholder?: string;
    mode?: "rows" | "cells";
    status?: Status;
    onChange?: (selected: Option["status"]) => void;
    onClose?: () => void;
    noArrow?: boolean;
    handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    name?: string;
    label?: string
};

const Select = (props: SelectProps) => {
    const {
        mode = "rows",
        options,
        placeholder,
        status = props.status,
        selected,
        onChange,
        onClose,
        noArrow,
        handleChange,
        name,
        label
    } = props;
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const placeholderRef = useRef<HTMLDivElement>(null);
    const changeStatus = (status: Status) => {
        return styles[`placeholder__${status}`]
    }
    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            const { target } = event;
            if (target instanceof Node && !rootRef.current?.contains(target)) {
                isOpen && onClose?.();
                setIsOpen(false);
            }
        };

        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("click", handleClick);
        };
    }, [onClose]);

    useEffect(() => {
        const placeholderEl = placeholderRef.current;
        if (!placeholderEl) return;

        const handleEnterKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Enter") {
                setIsOpen((prev) => !prev);
            }
        };
        placeholderEl.addEventListener("keydown", handleEnterKeyDown);

        return () => {
            placeholderEl.removeEventListener("keydown", handleEnterKeyDown);
        };
    }, []);

    const handleOptionClick = (value: Option["status"], name?: string) => {
        setIsOpen(false);
        onChange?.(value);
        handleChange?.({ target: { name: name, value: value } } as unknown as React.ChangeEvent<HTMLInputElement>)
    };
    const handlePlaceHolderClick: MouseEventHandler<HTMLDivElement> = () => {
        setIsOpen((prev) => !prev);
    };

    return (
        <div className={styles.selectContainer}>
            <label htmlFor="">{label}</label>
            <div
                className={styles.selectWrapper}
                ref={rootRef}
                data-is-active={isOpen}
                data-mode={mode}
                data-testid="selectWrapper"
            >
                {!noArrow && <div className={styles.arrow}>
                    <img src={ArrowDown} alt="" />
                </div>}
                <div
                    className={changeStatus(selected?.status as Status)}
                    data-status={status}
                    data-selected={!!selected?.status}
                    onClick={handlePlaceHolderClick}
                    role="button"
                    tabIndex={0}
                    ref={placeholderRef}
                >
                    {selected?.status || placeholder}
                </div>
                {isOpen && (
                    <ul className={styles.select} data-testid="selectDropdown">
                        {options.map((option) => (
                            <OptionEl
                                name={name}
                                selected={selected?.status as Status}
                                key={option.status}
                                option={option}
                                onClick={handleOptionClick}
                            />
                        ))}
                    </ul>
                )}
            </div>
        </div>

    );
};

export default Select;
