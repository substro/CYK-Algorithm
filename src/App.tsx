import { AlertCircle } from "lucide-react";
import React, { useState } from "react";
import { Alert, AlertTitle } from "./components/ui/alert";
import { Button } from "./components/ui/button";
import GrammarRow from "./components/ui/grammarRow";
import { Input } from "./components/ui/input";

function App() {
	const handleGrammarInputChange = (
		index: number,
		nonTerminal: string,
		terminal: string
	) => {
		setFormData((prevData) => ({
			...prevData,
			[index]: { nonTerminal: nonTerminal ? nonTerminal : "S", terminal },
		}));
	};
	const [grammarRows, setGrammarRows] = useState([
		<GrammarRow isFirst index={0} onInputChange={handleGrammarInputChange} />,
	]);
	const [wordInput, setWordInput] = useState("");
	const [formData, setFormData] = useState({});

	const addGrammarRow = () => {
		setGrammarRows((prevRows) => [
			...prevRows,
			<GrammarRow
				onDelete={handleDelete}
				index={prevRows.length}
				onInputChange={handleGrammarInputChange}
			/>,
		]);
	};

	const handleDelete = (indexToDelete: number) => {
		setGrammarRows(
			grammarRows.filter((_, itemIndex) => itemIndex !== indexToDelete)
		);
	};

	const handleWordInputChange = (e: {
		target: { value: React.SetStateAction<string> };
	}) => {
		setWordInput(e.target.value);
	};

	const handleSubmit = () => {
		const data = {
			grammarRows: Object.values(formData),
			word: wordInput,
		};
		const jsonData = JSON.stringify(data, null, 2);
		console.log(jsonData);
	};

	return (
		<div className="flex  flex-col items-center bg-primary h-screen">
			<header className="text-center text-secondary my-[2rem]">
				<h1 className="text-[3.5rem] font-bold">CYK- Algorithm</h1>
				<h3 className="text-[1rem] font-semibold text-pretty">
					Input your grammar to check if a certain word can be generated or not
				</h3>
			</header>
			<main className="my-[4rem] text-secondary mx-[2rem]">
				<div className="grid gap-4">
					<div className="space-y-2 ">
						<h2 className=" text-[2rem] font-medium leading-none">Grammar</h2>
						<p className="text-[1.5rem] text-muted-foreground">
							Enter your grammar below
						</p>
						<Alert variant="note">
							<AlertCircle className="h-4 w-4" />
							<AlertTitle>
								please separate your terminal symbols using commas (S -&gt; AB,
								BC)
							</AlertTitle>
						</Alert>
					</div>
					<div className="grid gap-2 w-fit ">
						{grammarRows.map((row, index) => (
							<div key={index}>{row}</div>
						))}
					</div>

					<Button
						variant={"link"}
						className="text-seondary text-xl"
						onClick={addGrammarRow}
					>
						+ Add Row
					</Button>
				</div>
				<div className="space-y-2 py-8">
					<h2 className=" text-[2rem] font-medium leading-none">Word</h2>
					<p className="text-[1.5rem] text-muted-foreground">
						Enter a word to check if it can be generated
					</p>
					<Input
						id="word"
						className="h-8 text-primary text-[1rem]"
						value={wordInput}
						onChange={handleWordInputChange}
					/>
				</div>

				<Button
					variant={"secondary"}
					size={"lg"}
					className="text-[1.5rem] "
					onClick={handleSubmit}
				>
					Check Result
				</Button>
			</main>
		</div>
	);
}

export default App;
