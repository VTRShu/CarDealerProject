import React from 'react';
import './HomePage.css';
import { FaLeaf, FaGasPump } from 'react-icons/fa';
import { ImPowerCord } from 'react-icons/im';
const HomePage = () => {
    return (
        <div style={{ backgroundColor: 'black' }}>
            <div style={{ textAlign: 'center' }}>
                <h3 style={{ color: 'white' }}>Welcome to the Mercedes-Benz Viet Nam Website</h3>
                <br />
                <p style={{ color: 'white' }}>Exclusive reports and current films: experience a broad range of topics from the fascinating world of Mercedes-Benz</p>
                <p style={{ color: 'white' }}>This is the International website of Mercedes-Benz AG.</p>
                <br />
                <div>
                    <a ><img style={{ height: '250px', width: "400px", padding: '2%' }} src="https://www.mercedes-benz.com/en/_jcr_content/root/channeltiles_copy_co/parsys/channeltilesitem_1850677750/image/MQ6-12-image-20210225164610/me-channel-tile_new.jpeg" /></a>
                    <a ><img style={{ height: '250px', width: "400px", padding: '2%' }} src="https://www.mercedes-benz.com/en/_jcr_content/root/channeltiles_copy_co/parsys/channeltilesitem_164191792/image/MQ6-12-image-20191216112113/she-channel-tile.jpeg" /></a>
                    <a ><img style={{ height: '250px', width: "400px", padding: '2%' }} src="https://www.mercedes-benz.com/en/_jcr_content/root/channeltiles_copy_co/parsys/channeltilesitem_1240785833/image/MQ6-12-image-20190123184747/museum-channel-tile.jpeg" /></a>
                </div>
            </div>
            <div className="News">
                <div className="item1">
                    <a>
                        <img src="https://www.mercedes-benz.com/en/eq-formulae/we-race-the-city/season/team-lay-foundations-for-season-8-during-valencia-testing/_jcr_content/image/MQ6-8-image-20211203083217/mercede-eq-formula-e-team-valencia-test-silver-arrow02-header-16-9jpeg.jpeg" />
                        <div className="content">
                            <h4 style={{ color: "white" }} >Team lay foundations for Season 8 during Valencia testing</h4>
                            <br />
                            <p style={{ color: "white" }} >The Mercedes-EQ Formula E Team successfully completed official testing for Season 8 of the ABB FIA Formula ...</p>
                        </div>
                    </a>
                </div>
                <div className="item2">
                    <a>
                        <img src="https://www.mercedes-benz.com/en/eq-formulae/_jcr_content/image/MQ6-8-image-20200727152825/Mercedes-Benz-EQ-Formula_E_Team_santiago_teserjpeg.jpeg" />
                        <div className="content">
                            <h4 style={{ color: "white" }} >
                                Mercedes-EQ Formula E Team
                            </h4>
                            <br />
                            <p style={{ color: "white" }} > Welcome to the Mercedes-EQ Formula E Team. Discover all about racing and our drive for lifestyle, sustainab...</p>
                        </div>
                    </a>
                </div>
                <div className="item3">
                    <a>
                        <img src="https://www.mercedes-benz.com/en/lifestyle/me-magazine/conversations-gorden-wagener-meets-yves-behar/_jcr_content/image/MQ6-8-image-20211125105153/01-mercedes-benz-me-magazine-conversations-gordon-wagener-yves-behar-2560x1440.jpeg" />
                        <div className="content">
                            <h4 style={{ color: "white" }} >Conversations: Gorden Wagener meets Yves Béhar.</h4>

                            <p style={{ color: "white" }} >Yves Béhar and Gorden Wagener have shaped the world with their designs.</p>
                        </div>
                    </a>
                </div>
                <div className="item4">
                    <a>
                        <img src="https://www.mercedes-benz.com/en/lifestyle/me-magazine/from-the-archive-oskar-schlemmer/_jcr_content/image/MQ6-8-image-20211125103911/01-mercedes-benz-me-magazine-from-the-archive-2560x1440.jpeg" />
                        <div className="content">
                            <h4 style={{ color: "white" }} >From the archive: Oskar Schlemmer. </h4>
                            <br />
                            <p style={{ color: "white" }} >The curator of the Daimler Art Collection Dr. Renate Wiehager presents a special art highlight in every is...</p>
                        </div>
                    </a>
                </div>
                <div className="item5">
                    <a>
                        <img src="https://www.mercedes-benz.com/en/vehicles/_jcr_content/image/MQ6-8-image-20211201110955/00-mercedes-benz-vehicles-passnger-cars-vans-2560x1440.jpeg" />
                        <div className="content">
                            <h4 style={{ color: "white" }} >Mercedes-Benz Vehicle Overview.</h4>
                            <br />
                            <p style={{ color: "white" }} >Discover the current vehicle models from Mercedes-Benz: Passenger vehicles, vans, trucks and buses.</p>
                        </div>
                    </a>
                </div>
                <div className="item6">
                    <a>
                        <img src="https://www.mercedes-benz.com/en/lifestyle/me-magazine/a-magical-masterpiece/_jcr_content/image/MQ6-8-image-20211118104606/01-mercedes-benz-me-magazine-pullmann-5120x2240.jpeg" />
                        <div className="content">
                            <h4 style={{ color: "white" }} >A magical masterpiece. </h4>
                            <br />
                            <p style={{ color: "white" }} >Mercedes-Benz redefined the luxury car in 1963 with the Pullman. An hommage.</p>
                        </div>
                    </a>
                </div>
                <div className="item7">
                    <a>
                        <img src="https://www.mercedes-benz.com/en/lifestyle/me-magazine/100-years-of-maybach-motorcars/_jcr_content/image/MQ6-8-image-20211117141504/01-mercedes-benz-me-magazine-100-years-of-maybach-motorcars-2560x1440.jpeg" />
                        <div className="content">
                            <h4 style={{ color: "white" }} >100 years of Maybach motorcars.</h4>
                            <br />
                            <p style={{ color: "white" }} >The history of Maybach has been closely tied to Mercedes-Benz. The common goal: driving luxury vehicles to ...</p>
                        </div>
                    </a>
                </div>
                <div className="item8">
                    <a>
                        <img src="https://www.mercedes-benz.com/en/sports/motorsports/_jcr_content/image/MQ6-8-image-20190304155936/M184789JPG.jpeg" />
                        <div className="content">
                            <h4 style={{ color: "white" }} >Motorsports </h4>
                            <br />
                            <p style={{ color: "white" }} >Mercedes-Benz Motorsports Channels</p>
                        </div>
                    </a>
                </div>
                <div className="item9">
                    <a>
                        <img src="https://www.mercedes-benz.com/en/sports/esports/sk-gaming-runs-mercedes-benz-doubles/_jcr_content/image/MQ6-8-image-20211124144926/mercedes-eqa-sk-gaming-movember-2021.jpeg" />
                        <div className="content">
                            <h4 style={{ color: "white" }} >SK Gaming runs, Mercedes-Benz doubles.</h4>
                            <br />
                            <p style={{ color: "white" }} >Under the claim "#MovingEsports towards health awareness", SK Gaming and Mercedes-Benz have joined forces f...</p>
                        </div>
                    </a>
                </div>
                <div className="item10">
                    <a>
                        <img src="https://www.mercedes-benz.com/en/eq-formulae/we-race-the-city/team/mercedes-eq-silver-arrow-02/_jcr_content/image/MQ6-8-image-20211124161106/mercedes-eq-formula-e-team-silver-arrow-02-season-8-id09jpeg.jpeg" />
                        <div className="content">
                            <h4 style={{ color: "white" }} >Mercedes-EQ Formula E Team facing fresh challenges in Season... </h4>
                            <br />
                            <p style={{ color: "white" }} >The Mercedes-EQ Formula E Team presented their driver line-up and updated livery design for Season 8 of the...</p>
                        </div>
                    </a>
                </div>
                <div className="item11">
                    <a>
                        <img src="https://www.mercedes-benz.com/en/lifestyle/classic-magazine/on-the-dad-route/_jcr_content/image/MQ6-8-image-20211110094110/01-mercedes-benz-classic-magazine-dad-route-2560x1440.jpeg" />
                        <div className="content">
                            <h4 style={{ color: "white" }} > On the “Dad Route”: A success story.</h4>
                            <br />
                            <p style={{ color: "white" }} >With hard work and luck, dreams can come true. Danny Lucas believed it and wrote his own success story.</p>
                        </div>
                    </a>
                </div>
                <div className="item12">
                    <a>
                        <img src="https://www.mercedes-benz.com/en/classic/history/in-orbit-for-100-years/_jcr_content/image/MQ6-8-image-20211118111816/01-mercedes-benz-history-in-orbit-for-100-years-2560x1440.jpeg" />
                        <div className="content">
                            <h4 style={{ color: "white" }} > In orbit for 100 years.</h4>
                            <br />
                            <p style={{ color: "white" }} >The Mercedes star in the ring turns 100: the trademark was registered by the Daimler-Motoren-Gesellschaft i...</p>
                        </div>
                    </a>
                </div>
                <div className="item13">
                    <a>
                        <img src="https://www.mercedes-benz.com/en/lifestyle/classic-magazine/it-must-be-love/_jcr_content/image/MQ6-8-image-20211110114129/01-mercedes-benz-classic-magazine-it-must-be-love-2560x1440.jpeg" />
                        <div className="content">
                            <h4 style={{ color: "white" }} >It must be love. </h4>
                            <br />
                            <p style={{ color: "white" }} >More and more young people are driving Mercedes-Benz classics. A journey through a colourful, passionate sc...</p>
                        </div>
                    </a>
                </div>
                <div className="item14">
                    <a>
                        <img src="https://www.mercedes-benz.com/en/vehicles/service-parts/_jcr_content/image/MQ6-8-image-20211117113830/01-mercdes-benz-service-parts-2560x1440.jpeg" />
                        <div className="content">
                            <h4 style={{ color: "white" }} >  Service & Parts. </h4>
                            <br />
                            <p style={{ color: "white" }} >Mercedes-Benz GenuineParts combine the entire expertise of Mercedes-Benz as a vehicle manufacturer. </p>
                        </div>
                    </a>
                </div>
                <div className="item15">
                    <a>
                        <img src="https://www.mercedes-benz.com/en/lifestyle/fashion/mercedes-benz-collaborates-with-proenza-schouler/_jcr_content/image/MQ6-8-image-20211124082645/00-mercedes-benz-fashion-mercedes-benz-collaborates-with-proenza-schouler-2560x1440.jpeg" />
                        <div className="content">
                            <h4 style={{ color: "white" }} >Mercedes-Benz collaborates with Proenza Schouler. </h4>
                            <br />
                            <p style={{ color: "white" }} > Mercedes-Benz and Proenza Schouler have united on a journey of considered, responsible luxury design and cr...</p>
                        </div>
                    </a>
                </div>
                <div className="item16">
                    <a>
                        <img src="https://www.mercedes-benz.com/en/lifestyle/classic-magazine/south-american-adventure/_jcr_content/image/MQ6-8-image-20211109153718/01-mercedes-benz-classic-magazine-south-american-adventure-2560x1440.jpeg" />
                        <div className="content">
                            <h4 style={{ color: "white" }} > South American adventure</h4>
                            <br />
                            <p style={{ color: "white" }} > After a year of pandemic, Kevin and Lars see their Mercedes-Benz 300 TE left behind in the jungle again.</p>
                        </div>
                    </a>
                </div>
                <div className="item17">
                    <a>
                        <img src="https://www.mercedes-benz.com/en/lifestyle/studio-odeonsplatz/_jcr_content/image/MQ6-8-image-20211115170754/Studio-Odeonsplatz-The-Design-Edit-Proenza-Schouler-window-outside-2560x1440.jpeg" />
                        <div className="content">
                            <h4 style={{ color: "white" }} >
                                Studio Odeonsplatz by Mercedes-Benz.
                            </h4>
                            <br />
                            <p style={{ color: "white" }} > Discover our unique Brand Experience Space in the very heart of Munich.</p>
                        </div>
                    </a>

                </div>
                <div className="item18">
                    <a>
                        <img src="https://www.mercedes-benz.com/en/vehicles/passenger-cars/eqe/_jcr_content/image/MQ6-8-image-20210904154811/mercedes-benz-eqe-v295-teaser-3400x1912-08-2021.jpeg" />
                        <div className="content">
                            <h4 style={{ color: "white" }} >EQE. </h4>
                            <br />
                            <p style={{ color: "white" }} >The new EQE. Enjoy electric driving with all your senses.  </p>
                        </div>
                    </a>

                </div>
                <div className="item19">
                    <a>
                        <img src="https://www.mercedes-benz.com/en/vehicles/passenger-cars/g-class/concept-eqg/_jcr_content/image/MQ6-8-image-20210903171220/mercedes-eq-concept-eqg-teaser-2560x1440-09-2021.jpeg" />
                        <div className="content">
                            <h4 style={{ color: "white" }} >  Concept EQG. </h4>
                            <br />
                            <p style={{ color: "white" }} >The Concept EQG gives an outlook into the future of the G-Class. Find out more about the futuristic design ... </p>
                        </div>
                    </a>

                </div>
                <div className="item20">
                    <a>
                        <img src="https://www.mercedes-benz.com/en/design/insights/the-scent-of-mercedes-benz-luxury/_jcr_content/image/MQ6-8-image-20211104120331/00-mercedes-benz-the-scent-of-mercedes-benz-luxury-2560x1440.jpeg" />
                        <div className="content">
                            <h4 style={{ color: "white" }} >
                                The scent of Mercedes-Benz luxury.
                            </h4>
                            <br />
                            <p style={{ color: "white" }} > We have created 16 individual vehicle fragrances to experience Mercedes-Benz with all senses and enhance yo...</p>
                        </div>
                    </a>

                </div>
                <div className="item21">
                    <a>
                        <img src="https://www.mercedes-benz.com/en/sports/esports/championship-ring-making-of/_jcr_content/image/MQ6-8-image-20211103112932/00-mercedes-benz-league-of-legends-championship-ring-making-of-2560x1440.jpeg" />
                        <div className="content">
                            <h4 style={{ color: "white" }} >  Championship Ring “Making of”.</h4>
                            <br />
                            <p style={{ color: "white" }} > Mercedes-Benz and Riot Games show the history of the League of Legends Championship Ring in a documentary.</p>
                        </div>
                    </a>

                </div>
                <div className="item22">
                    <a>
                        <img src="https://www.mercedes-benz.com/en/classic/classiccenter/classic-spare-parts/_jcr_content/image/MQ6-8-image-20211026131320/01-classic-serviceparts-header-2560x1440.jpeg" />
                        <div className="content">
                            <h4 style={{ color: "white" }} > Classic spare parts.  </h4>
                            <br />
                            <p style={{ color: "white" }} > Mercedes-Benz Classic offers genuine spare parts of the highest quality for the preservation of your classi...</p>
                        </div>
                    </a>

                </div>
                <div className="item23">
                    <a>
                        <img src="https://www.mercedes-benz.com/en/vehicles/passenger-cars/eqs/time-for-a-new-era-the-new-eqs/_jcr_content/image/MQ6-8-image-20201223103555/00-time-for-a-new-era-the-new-eqs-2560x1440.jpeg" />
                        <div className="content">
                            <h4 style={{ color: "white" }} >
                                Time for a new era: The new EQS.
                            </h4>
                            <br />
                            <p style={{ color: "white" }} > It is time for a new era. Join us on major steps into a world of progressive luxury and innovation, design ...</p>
                        </div>
                    </a>

                </div>
            </div>
            <div style={{ color: "white", margin: '3%' }}>
                <p style={{ color: "white", fontSize: '15px' }}> <FaGasPump /> Combined fuel consumption
                    <FaLeaf style={{ marginLeft: '1%' }} /> Combined CO₂ emissions
                    <ImPowerCord style={{ marginLeft: '1%' }} /> Power consumption in the combined test cycle</p>
                <p style={{ color: "white", fontSize: '15px' }}>1 The stated values ​​were determined in accordance with the prescribed measuring method.
                    These are the "NEDC CO₂ values" i. S. v. Art. 2 No. 1 Implementing Regulation (EU) 2017/1153.
                    The fuel consumption values ​​were calculated on the basis of these values.
                    The electricity consumption was determined on the basis of VO 692/2008 / EG.
                    Further information on the official fuel consumption and the official specific CO₂ emissions of new passenger cars
                    can be found in the "Guide to fuel consumption, CO₂ emissions and power consumption of all new passenger car models",
                    which is available at all sales outlets and at Deutsche Automobil Treuhand GmbH at www. dat.de is available free of charge.</p>
                <p style={{ color: "white", fontSize: '15px' }}>4 Information on fuel consumption, electricity consumption and CO₂ emissions are provisional and were determined by the
                    technical service for the certification procedure in accordance with the WLTP test procedure and correlated in NEDC values. An EC type approval and certificate of conformity
                    with official values ​​are not yet available. Deviations between the information and the official values ​​are possible.</p>

                <p style={{ color: "white", fontSize: '15px' }}>6 Power consumption and range were determined on the basis of Regulation 692/2008 / EC. Power consumption and range
                    depend on the vehicle configuration. Further information on the official fuel consumption and the official specific CO₂ emissions of new passenger cars can be found in the
                    "Guide to fuel consumption, CO₂ emissions and power consumption of all new passenger car models", which is available at all sales outlets and at Deutsche Automobil Treuhand GmbH at www. dat.de is available free of charge.</p>

                <p style={{ color: "white", fontSize: '15px' }}>7 Information on power consumption and range are provisional and were determined by the technical service for the
                    certification process in accordance with UN / ECE regulation No. 101. The EC type approval and a certificate of conformity with official values ​​are not yet available.
                    Deviations between the information and the official values ​​are possible.</p>

                <p style={{ color: "white", fontSize: '15px' }}>8 All technical information is provisional and was determined internally in accordance with the applicable certification method.
                    So far there are neither confirmed values ​​from TÜV nor an EC type approval nor a certificate of conformity with official values. Deviations between the information and the
                    official values ​​are possible.</p>
            </div>
            <div style={{ textAlign: "center", borderTop: '1px solid grey' }}>
                <a ><img style={{ height: '250px', width: "400px", padding: '5%', marginRight: '5%' }} src="https://www.mercedes-benz.com/content/dam/brandhub/experience-fragments/related-websites-logos/logo_amg.svg" /></a>
                <a ><img style={{ height: '250px', width: "400px", padding: '5%' }} src="https://www.mercedes-benz.com/content/dam/brandhub/experience-fragments/related-websites-logos/logo_daimler.svg" /></a>
                <a ><img style={{ height: '250px', width: "400px", padding: '5%', marginLeft: '5%' }} src="https://www.mercedes-benz.com/content/dam/brandhub/experience-fragments/related-websites-logos/logo_smart.svg" /></a>
            </div>
        </div>
    )
}

export default HomePage;