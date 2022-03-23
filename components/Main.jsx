/** @format */

import TestCard from "./testCard";

export default function Main() {
	const testimonials = {
		name: "John Doe",
		text: `Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Facilis sunt reiciendis maxime quisquam non consectetur
					asperiores provident nisi alias vero laboriosam ipsam
					inventore maiores labore assumenda.`,
		img: "https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/q66zlchpgkpp2fmg5wo8",
	};
	return (
		<>
			<main>
				<div className="aboutus">
					<div className="fundspara">
						<h1>Why is it importent</h1>
						<p>
							Lorem, ipsum dolor sit amet consectetur adipisicing
							elit. Omnis nisi assumenda autem vel quam, ea tempora
							aspernatur ullam dicta, non in accusantium sint
							voluptatum nihil magnam molestias repudiandae veritatis
							quasi? Unde iusto aperiam provident! Commodi, eligendi
							deserunt expedita hic necessitatibus adipisci repellat
							impedit alias fuga, veniam quaerat consectetur esse unde
							sit aut autem est? Delectus eum molestias omnis
							laudantium error. Excepturi deleniti asperiores hic
							minus veniam laudantium culpa mollitia, quo ab commodi
							iure porro explicabo accusantium placeat, consequuntur
							fuga maxime est. Sit laborum numquam magnam
							voluptatibus, veritatis libero explicabo quibusdam.
							Perspiciatis sequi sed odit mollitia dolorem cupiditate,
							est magni quis alias, eveniet dolore fugiat minima
							aliquid porro nam nulla in nihil nobis sapiente iste.
							Nam qui quis sit maiores rerum? Magnam nihil mollitia
							vel similique reprehenderit soluta officia blanditiis
							totam sapiente libero aspernatur quis, doloremque fugit,
							dolorem quia exercitationem accusamus maiores commodi
							magni. Vero illum quae eligendi earum omnis beatae!
							Ipsam unde accusantium ratione aliquid optio! Quis
							soluta molestias assumenda explicabo. Ea non incidunt
							temporibus maxime praesentium recusandae, nobis
							similique ipsam amet magni assumenda nesciunt modi
							laudantium, rerum saepe corporis! Cupiditate
							necessitatibus voluptas aliquid, corrupti id ducimus
							distinctio enim doloribus? Voluptate at nisi quas dolore
							quaerat cumque necessitatibus a assumenda facilis illum,
							iste iusto quia recusandae vero deleniti. Ratione,
							pariatur? Cum, at similique officiis libero, aperiam
							ipsam quae aliquam mollitia laborum, eaque soluta ad
							asperiores? Autem, qui, tempore molestias deleniti saepe
							in aperiam, eligendi corrupti inventore tenetur ipsum
							corporis voluptas. Voluptatum esse voluptatem id quis!
							Cum placeat quisquam nesciunt dolorum velit.
						</p>
					</div>
					<div className="fundsimg">
						<img
							src="https://www.quasa.io/storage/photos/%D0%A4%D0%BE%D1%82%D0%BE%2014/%D0%B0%D1%84%D0%B0%D1%83%D0%BD%204.png"
							alt="about funding"
						/>
					</div>
				</div>
				<center>
					{" "}
					<h1>Testimonials</h1>
				</center>
				<div className="testmonials">
					{Array(5)
						.fill(testimonials)
						.map((item, index) => {
							return (
								<TestCard
									key={index}
									img={item.img}
									name={item.name}
									text={item.text}
								/>
							);
						})}
				</div>
				<div className="testmonials">
					{Array(5)
						.fill(testimonials)
						.map((item, index) => {
							return (
								<TestCard
									key={index}
									img={item.img}
									name={item.name}
									text={item.text}
								/>
							);
						})}
				</div>
			</main>
		</>
	);
}
