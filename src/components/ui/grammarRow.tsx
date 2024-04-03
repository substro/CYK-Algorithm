import { X } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./button";
import { Input } from "./input";

type GrammarRowProps = {
	isFirst?: boolean;
	onDelete?: (index: number) => void;
	index: number;
	onInputChange?: (
		index: number,
		nonTerminal: string,
		terminal: string
	) => void;
};

const GrammarRow: React.FC<GrammarRowProps> = (props) => {
	const { isFirst, onDelete, index, onInputChange } = props;
	const [nonTerminalValue, setNonTerminalValue] = useState("");
	const [terminalValue, setTerminalValue] = useState("");

	const handleDelete = () => {
		if (onDelete && !isFirst) {
			onDelete(index);
		}
	};

	const handleNonTerminalChange = (e: { target: { value: any } }) => {
		const value = e.target.value;
		setNonTerminalValue(value);
		if (onInputChange) {
			onInputChange(index, value, terminalValue); // Call onInputChange with updated values
		}
	};

	const handleTerminalChange = (e: { target: { value: any } }) => {
		const value = e.target.value;
		setTerminalValue(value);
		if (onInputChange) {
			onInputChange(index, nonTerminalValue, value); // Call onInputChange with updated values
		}
	};

	return (
		<div className="flex  gap-5">
			{isFirst ? (
				<Input
					id="start-symbol"
					defaultValue={"S"}
					disabled
					className="h-8 text-primary w-[30%] text-[1rem] font-bold"
				/>
			) : (
				<Input
					id="non-terminal"
					className="h-8 text-primary w-[30%] text-[1rem] font-bold"
					value={nonTerminalValue}
					onChange={handleNonTerminalChange}
				/>
			)}
			<svg
				data-name="1-Arrow Right"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 32 32"
				className="rotate-90 w-[3rem] h-[2rem] fill-current flex-auto"
			>
				<path d="m26.71 10.29-10-10a1 1 0 0 0-1.41 0l-10 10 1.41 1.41L15 3.41V32h2V3.41l8.29 8.29z" />
			</svg>
			<Input
				id="terminal"
				className="h-8 text-primary text-[1rem]"
				value={terminalValue}
				onChange={handleTerminalChange}
			/>
			<Button
				disabled={isFirst ? true : false}
				variant="outline"
				size="icon"
				className="text-primary h-auto"
				onClick={handleDelete}
			>
				<X />
			</Button>
		</div>
	);
};

export default GrammarRow;
