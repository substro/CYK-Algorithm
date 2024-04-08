import { AlertCircle, X } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { Alert, AlertTitle } from "./components/ui/alert";
import { Button } from "./components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./components/ui/dialog";
import { Input } from "./components/ui/input";
type grammarSchemha = {
	nonTerminal: string;
	terminal: string;
};

export type arrayFormType = {
	grammar: grammarSchemha[];
	word: string;
};
function App() {
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<arrayFormType>({
		defaultValues: {
			grammar: [{ nonTerminal: "S", terminal: "" }],
		},
	});
	const { fields, append, remove } = useFieldArray<arrayFormType>({
		control,
		name: "grammar",
	});

	const onFormSubmit: SubmitHandler<arrayFormType> = (data) => {
		console.log(data); // Optional: Log the data

		// Make a POST request to your endpoint
		fetch(
			"https://k8yiu0rqtj.execute-api.us-east-2.amazonaws.com/default/CYKAlgorithm",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json", // Set the content type as JSON
				},
				body: JSON.stringify(data), // Convert data to JSON string
			}
		)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				// Optional: Handle successful response
				console.log("Data sent successfully" + "response: " + response);
			})
			.catch((error) => {
				// Optional: Handle error
				console.error("Error sending data:", error.message);
			});
	};

	return (
		<div className="flex flex-col items-center bg-primary h-screen">
			<header className="text-center text-secondary my-[2rem]">
				<h1 className="text-[3.5rem] font-bold">CYK- Algorithm</h1>
				<h3 className="text-[1rem] font-semibold text-pretty">
					Input your grammar to check if a certain word can be generated or not
				</h3>
			</header>
			<form
				onSubmit={handleSubmit(onFormSubmit)}
				className="my-[4rem] text-secondary mx-[2rem]"
			>
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
						{fields.map((field, index) => {
							return (
								<div className="flex  gap-5" key={field.id}>
									<Input
										{...register(`grammar.${index}.nonTerminal`, {
											required: "This field is required",
										})}
										className={`h-8 text-primary w-[30%] text-[1rem] font-bold ${
											errors?.grammar?.[index]?.nonTerminal?.message &&
											"border-2 border-red-500"
										}`}
										disabled={index === 0}
									/>

									<svg
										data-name="1-Arrow Right"
										xmlns="http://www.w3.org/2000/svg"
										viewBox="0 0 32 32"
										className="rotate-90 w-[3rem] h-[2rem] fill-current flex-auto"
									>
										<path d="m26.71 10.29-10-10a1 1 0 0 0-1.41 0l-10 10 1.41 1.41L15 3.41V32h2V3.41l8.29 8.29z" />
									</svg>
									<Input
										className={`h-8 text-primary text-[1rem] ${
											errors?.grammar?.[index]?.terminal?.message &&
											"border-2 border-red-500"
										}`}
										{...register(`grammar.${index}.terminal`, {
											required: "This field is required",
										})}
									/>
									<Button
										disabled={index === 0}
										variant="outline"
										size="icon"
										className="text-primary h-auto"
										type="button"
										onClick={() => remove(index)}
									>
										<X />
									</Button>
								</div>
							);
						})}
					</div>

					<Button
						variant={"link"}
						className="text-seondary text-xl"
						type="button"
						onClick={() =>
							append({
								nonTerminal: "",
								terminal: "",
							})
						}
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
						className={`h-8 text-primary text-[1rem] ${
							errors?.word?.message && "border-2 border-red-500"
						}`}
						{...register(`word`, { required: "true" })}
					/>
				</div>
				<Dialog>
					<DialogTrigger asChild>
						<Button
							variant={"secondary"}
							size={"lg"}
							className="text-[1.5rem] "
							type="submit"
						>
							Check Result
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-md">
						<DialogHeader>
							<DialogTitle>CYK Algorithm Results</DialogTitle>
							<DialogDescription>Word: </DialogDescription>
						</DialogHeader>
						<p></p>
					</DialogContent>
				</Dialog>
			</form>
		</div>
	);
}

export default App;
