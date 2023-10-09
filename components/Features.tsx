import Features1 from "../assets/img/svg/Features1.svg";
import Features2 from "../assets/img/svg/Features2.svg";
import Features3 from "../assets/img/svg/Features3.svg";
import Image from "next/image";
import { Signature } from "@phosphor-icons/react";

const Features = () => {
	return (
		<>
			<div className="bg-gray-200 p-4 md:p-6 rounded-3xl my-4 mx-4">
				<div className="Head text-center">
					<p className="site-feature_title-three">Awesome Features</p>
					<h2 className="site-feature_header">
						Feel The Best Experience With Our Features.
					</h2>
					<p className="site-feature_description mt-4 mb-4 mx-auto max-w-xl">
						The integration of AI and ML enhances the user experience, making
						document analysis and signing seamless and efficient. This is what
						we offer.
					</p>

					<div className="flex flex-col md:flex-row items-center justify-between py-2 mt-4">
						<div className="w-full md:w-1/2 mb-4 md:mb-0 md:pr-4">
							<Image
								src={Features2}
								alt="Features_image"
								width={400}
								height={48}
							/>
						</div>
						<div className="w-full md:w-1/2">
							<p className="site-feature_title-two">Awesome Features</p>
							<h2 className="site-feature_title">User Authentication</h2>
							<p>
								Users can register and log in using a secure authentication
								system. Multi-factor authentication for added security.
							</p>
							<button className="btn mt-4">Learn More</button>
						</div>
					</div>

					<div className="flex flex-col md:flex-row items-center justify-between py-5 mt-4">
						<div className="order-2 w-full md:w-1/2 md:pr-2 mb-4 md:mb-0">
							<Image
								src={Features2}
								alt="Features_image"
								width={400}
								height={48}
							/>
						</div>
						<div className="order-1 w-full md:w-1/2">
							<p className="site-feature_title-two">Awesome Features</p>
							<h2 className="site-feature_title">
								Document Creation and Sharing
							</h2>
							<p>
								Users can create, upload, and edit documents within the
								platform. Integration with sockets to allow real-time
								collaboration and creation of multiple documents with unique
								IDs, similar to Google Docs.
							</p>
							<p className="mt-2">
								Option to share documents via email. The document can only be
								accessed using the specific Google account it was sent to,
								ensuring security and privacy.
							</p>
							<button className="btn mt-4">Learn More</button>
						</div>
					</div>

					<div className="flex flex-col md:flex-row items-center justify-between py-4 mt-4">
						<div className="w-full md:w-1/2 mb-4 md:mb-0 md:pr-4">
							<Image
								src={Features3}
								alt="Features_image"
								width={400}
								height={48}
							/>
						</div>
						<div className="w-full md:w-1/2">
							<p className="site-feature_title-two">Awesome Features</p>
							<h2 className="site-feature_title">Signatory Pad</h2>
							<p>
								For users who prefer to sign manually, a digital signatory pad
								feature is available. This is integrated using the Dropbox API.
							</p>
							<button className="btn mt-4">Learn More</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Features;
