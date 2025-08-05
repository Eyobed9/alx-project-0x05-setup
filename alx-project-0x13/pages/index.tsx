import ImageCard from "@/components/common/ImageCard";
import useFetchData from "@/hooks/useFetchData";
import { ImageProps } from "@/interfaces";
import { useEffect, useState } from "react";

const Home: React.FC = () => {
	const [prompt, setPrompt] = useState<string>("");
	const [imageUrl, setImageUrl] = useState<string>("");
	const { isLoading, responseData, generatedImages, fetchData } = useFetchData<any, { prompt: string}>();

	const handleGenerateImage = () => {
		fetchData('/api/generate-image', { prompt })
	}

	useEffect(()=> {
		if (!isLoading)
		{
			setImageUrl(responseData?.message)
		}
	}, [isLoading])

	return (
		<div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
			<div className="flex flex-col items-center">
				<h1 className="text-4xl text-gray-700 font-bold mb-2">
					Image Generation App
				</h1>
				<p className="text-lg text-gray-700 mb-4">
					Generate stunning images based on your prompts!
				</p>

				<div className="w-full max-w-md">
					<input
						type="text"
						value={prompt}
						onChange={(e) => setPrompt(e.target.value)}
						placeholder="Enter your prompt here..."
						className="w-full text-gray-700 p-3 border border-gray-300 rounded-lg mb-4"
					/>
					<button
						onClick={handleGenerateImage}
						className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 cursor-pointer"
					>
						<div className="flex justify-center">
							{isLoading && (
								<div className="mr-3 w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
							)}
							{isLoading ? "Loading..." : "Generate Image"}
						</div>
					</button>
				</div>

				{imageUrl && (
					<ImageCard
						action={() => setImageUrl(imageUrl)}
						imageUrl={imageUrl}
						prompt={prompt}
					/>
				)}
			</div>
			{generatedImages.length ? (
				<div className="text-gray-700">
					<h3 className="text-2xl mt-4 font-bold text-center mb-4">
						Generated Images
					</h3>
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-full md:max-w-[1100px] p-2 overflow-y-scroll h-96">
						{generatedImages?.map(
							({ imageUrl, prompt }: ImageProps, index) => (
								<ImageCard
									action={() => setImageUrl(imageUrl)}
									imageUrl={imageUrl}
									prompt={prompt}
									key={index}
									width="w-full"
									height="h-40"
								/>
							)
						)}
					</div>
				</div>
			) : (
				""
			)}
		</div>
	);
};

export default Home;
