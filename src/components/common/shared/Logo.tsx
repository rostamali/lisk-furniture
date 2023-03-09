const Logo = ({ color }: { color: string }) => {
	return (
		<>
			<div className="brand-logo">
				<svg
					width="81"
					height="29"
					viewBox="0 0 81 29"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M16.7383 23.8867V28H3.85352V23.8867H16.7383ZM5.55859 2.40625V28H0.285156V2.40625H5.55859ZM24.7891 8.98047V28H19.709V8.98047H24.7891ZM19.3926 4.02344C19.3926 3.28516 19.6504 2.67578 20.166 2.19531C20.6816 1.71484 21.373 1.47461 22.2402 1.47461C23.0957 1.47461 23.7812 1.71484 24.2969 2.19531C24.8242 2.67578 25.0879 3.28516 25.0879 4.02344C25.0879 4.76172 24.8242 5.37109 24.2969 5.85156C23.7812 6.33203 23.0957 6.57227 22.2402 6.57227C21.373 6.57227 20.6816 6.33203 20.166 5.85156C19.6504 5.37109 19.3926 4.76172 19.3926 4.02344ZM39.2559 22.7441C39.2559 22.3809 39.1504 22.0527 38.9395 21.7598C38.7285 21.4668 38.3359 21.1973 37.7617 20.9512C37.1992 20.6934 36.3848 20.459 35.3184 20.248C34.3574 20.0371 33.4609 19.7734 32.6289 19.457C31.8086 19.1289 31.0938 18.7363 30.4844 18.2793C29.8867 17.8223 29.418 17.2832 29.0781 16.6621C28.7383 16.0293 28.5684 15.3086 28.5684 14.5C28.5684 13.7031 28.7383 12.9531 29.0781 12.25C29.4297 11.5469 29.9277 10.9258 30.5723 10.3867C31.2285 9.83594 32.0254 9.4082 32.9629 9.10352C33.9121 8.78711 34.9785 8.62891 36.1621 8.62891C37.8145 8.62891 39.2324 8.89258 40.416 9.41992C41.6113 9.94727 42.5254 10.6738 43.1582 11.5996C43.8027 12.5137 44.125 13.5566 44.125 14.7285H39.0625C39.0625 14.2363 38.957 13.7969 38.7461 13.4102C38.5469 13.0117 38.2305 12.7012 37.7969 12.4785C37.375 12.2441 36.8242 12.127 36.1445 12.127C35.582 12.127 35.0957 12.2266 34.6855 12.4258C34.2754 12.6133 33.959 12.8711 33.7363 13.1992C33.5254 13.5156 33.4199 13.8672 33.4199 14.2539C33.4199 14.5469 33.4785 14.8105 33.5957 15.0449C33.7246 15.2676 33.9297 15.4727 34.2109 15.6602C34.4922 15.8477 34.8555 16.0234 35.3008 16.1875C35.7578 16.3398 36.3203 16.4805 36.9883 16.6094C38.3594 16.8906 39.584 17.2598 40.6621 17.7168C41.7402 18.1621 42.5957 18.7715 43.2285 19.5449C43.8613 20.3066 44.1777 21.3086 44.1777 22.5508C44.1777 23.3945 43.9902 24.168 43.6152 24.8711C43.2402 25.5742 42.7012 26.1895 41.998 26.7168C41.2949 27.2324 40.4512 27.6367 39.4668 27.9297C38.4941 28.2109 37.3984 28.3516 36.1797 28.3516C34.4102 28.3516 32.9102 28.0352 31.6797 27.4023C30.4609 26.7695 29.5352 25.9668 28.9023 24.9941C28.2812 24.0098 27.9707 23.002 27.9707 21.9707H32.7695C32.793 22.6621 32.9688 23.2188 33.2969 23.6406C33.6367 24.0625 34.0645 24.3672 34.5801 24.5547C35.1074 24.7422 35.6758 24.8359 36.2852 24.8359C36.9414 24.8359 37.4863 24.748 37.9199 24.5723C38.3535 24.3848 38.6816 24.1387 38.9043 23.834C39.1387 23.5176 39.2559 23.1543 39.2559 22.7441ZM52.5273 0.982422V28H47.4648V0.982422H52.5273ZM64.5156 8.98047L56.2539 18.4023L51.8242 22.8848L49.9785 19.2285L53.4941 14.7637L58.4336 8.98047H64.5156ZM59.2598 28L53.6348 19.2109L57.1328 16.1523L65.0957 28H59.2598Z"
						fill={color}
					/>
					<path
						d="M69.1562 23.1133C69.1562 21.6133 69.6719 20.3594 70.7031 19.3516C71.7578 18.3438 73.1523 17.8398 74.8867 17.8398C76.6211 17.8398 78.0039 18.3438 79.0352 19.3516C80.0898 20.3594 80.6172 21.6133 80.6172 23.1133C80.6172 24.6133 80.0898 25.8672 79.0352 26.875C78.0039 27.8828 76.6211 28.3867 74.8867 28.3867C73.1523 28.3867 71.7578 27.8828 70.7031 26.875C69.6719 25.8672 69.1562 24.6133 69.1562 23.1133Z"
						fill="#FAAD3D"
					/>
				</svg>
			</div>
		</>
	);
};

export default Logo;
