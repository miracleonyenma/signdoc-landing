import Features1 from "../assets/img/svg/Features1.svg";
import Features2 from "../assets/img/svg/Features2.svg";
import Features3 from "../assets/img/svg/Features3.svg";
import Image from "next/image";


const Features = () => {
	return (
		<div className="bg-gray-200 p-4 rounded-3xl mt-4 mx-4 my-4">
			<h2 className="site-feature_header">Features Section</h2>
			<p className="site-feature_description">
				The integration of AI and ML enhances the user experience, making
				document analysis and signing seamless and efficient. This is what we
				offer below:
			</p>

			<br />
			<div className="flex flex-col md:flex-row items-center">
				<div className="w-full md:w-1/2 mb-4 md:mb-0 md:pr-4">
					<Image
						src={Features2}
						alt="logo"
						width={500}
						height={48}
						className=""
					/>
				</div>
				<div className="w-full md:w-1/2">
					<h2 className="site-feature_title">Awesome Features</h2>
					<p className="whitespace-normal">
						Users can store their signature in the platform. When they choose
						this option, the AI will automatically place their signature in the
						identified areas.
					</p>
					<br />
					<button className="btn">Learn More</button>
				</div>
			</div>

			<br />

			<div className="flex flex-col md:flex-row items-center">
				<div className="order-2 w-full md:w-1/2 md:pr-2 mb-2 md:mb-0 mt-8">
					<Image
						src={Features2}
						alt="logo"
						width={500}
						height={48}
						className=""
					/>
					<br />
				</div>
				<div className="order-1 w-full md:w-1/2">
					<h2 className="site-feature_title">Awesome Features</h2>
					<p className="whitespace-normal">
						Users can store their signature in the platform. When they choose
						this option, the AI will automatically place their signature in the
						identified areas.
					</p>
					<br />
					<button className="btn">Learn More</button>
					<br />
				</div>
			</div>

			<br />

			<div className="flex flex-col md:flex-row items-center">
				<div className="w-full md:w-1/2 mb-4 md:mb-0 md:pr-4">
					<Image
						src={Features3}
						alt="logo"
						width={500}
						height={48}
						className=""
					/>
				</div>
				<div className="w-full md:w-1/2">
					<h2 className="site-feature_title">Awesome Features</h2>
					<p className="whitespace-normal">
						Users can store their signature in the platform. When they choose
						this option, the AI will automatically place their signature in the
						identified areas.
					</p>
					<br />
					<button className="btn">Learn More</button>
				</div>
			</div>
			
		</div>
	);
};

export default Features;
