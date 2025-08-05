import { GeneratedImageProps } from "@/interfaces";

const ImageCard: React.FC<GeneratedImageProps> = ({
	imageUrl,
	prompt,
	width,
	action,
}) => {
	return (
		<div
			onClick={() => action(imageUrl)}
			className="mt-6 hover:cursor-pointer mb-4"
		>
			<img
				src={imageUrl}
				alt={prompt}
				className={`w-full max-w-md rounded-lg shadow-lg`}
			/>
			<h2
				className={`${
					width ? "text-sm" : "text-xl"
				} font-semibold mt-2 text-gray-700 inline mr-2`}
			>
				Your Prompt:
			</h2>
			<p
				className={`${
					width ? "text-xs" : "text-lg"
				} text-gray-700 mb-4 inline`}
			>
				{prompt}
			</p>
		</div>
	);
};

export default ImageCard;
