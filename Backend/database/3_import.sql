-- PRAEGU EI TASU NÄPPIDA
INSERT INTO pearls.role (id, name)
VALUES (default, 'admin');
INSERT INTO pearls.role (id, name)
VALUES (default, 'customer');


INSERT INTO pearls."user" (id, role_id, username, password, email, status) VALUES (default, 1, 'admin', '123', 'admin@admin.com', 'A');
INSERT INTO pearls."user" (id, role_id, username, password, email, status) VALUES (default, 1, 'mikk', '123', 'mikk@mikk.com', 'A');
INSERT INTO pearls."user" (id, role_id, username, password, email, status) VALUES (default, 1, 'kaspar', '123', 'kaspar@kaspar.com', 'A');
INSERT INTO pearls."user" (id, role_id, username, password, email, status) VALUES (default, 1, 'martin', '123', 'martin@martin.com', 'A');
INSERT INTO pearls."user" (id, role_id, username, password, email, status) VALUES (default, 2, 'trollUser', '123', 'troll@hot.ee', 'D');
INSERT INTO pearls."user" (id, role_id, username, password, email, status) VALUES (default, 2, 'legitCustomer', '123', 'legit@google.com', 'A');
INSERT INTO pearls."user" (id, role_id, username, password, email, status) VALUES (default, 2, 'Taavi Libe', 'TaaviOnÄge', 'taavi@libe.com', 'A');




INSERT INTO pearls.county (id, name, longfield, latfield, zoomlevel) VALUES (default, 'Harjumaa', 24.742995, 59.413591, 9);
INSERT INTO pearls.county (id, name, longfield, latfield, zoomlevel) VALUES (default, 'Hiiumaa', 22.621509, 58.934989, 10);
INSERT INTO pearls.county (id, name, longfield, latfield, zoomlevel) VALUES (default, 'Tartu', 26.725891, 58.370621, 9);
INSERT INTO pearls.county (id, name, longfield, latfield, zoomlevel) VALUES (default, 'Rapla', 24.800537, 59.009625, 10);
INSERT INTO pearls.county (id, name, longfield, latfield, zoomlevel) VALUES (default, 'Viljandi', 25.581116, 58.381804, 10);
INSERT INTO pearls.county (id, name, longfield, latfield, zoomlevel) VALUES (default, 'Võrumaa', 27.011673, 57.838903, 11);
INSERT INTO pearls.county (id, name, longfield, latfield, zoomlevel) VALUES (default, 'Ida-Virumaa', 27.370584, 59.283795, 10);
INSERT INTO pearls.county (id, name, longfield, latfield, zoomlevel) VALUES (default, 'Jõgeva', 26.364070, 58.745204, 10);
INSERT INTO pearls.county (id, name, longfield, latfield, zoomlevel) VALUES (default, 'Saaremaa', 22.560209, 58.434360, 10);
INSERT INTO pearls.county (id, name, longfield, latfield, zoomlevel) VALUES (default, 'Järvamaa', 25.500000, 58.883300, 10);
INSERT INTO pearls.county (id, name, longfield, latfield, zoomlevel) VALUES (default, 'Läänemaa', 23.550000, 58.950000, 10);
INSERT INTO pearls.county (id, name, longfield, latfield, zoomlevel) VALUES (default, 'Lääne-Virumaa', 26.350000, 59.350000, 10);
INSERT INTO pearls.county (id, name, longfield, latfield, zoomlevel) VALUES (default, 'Põlva', 27.066700, 58.066700, 10);
INSERT INTO pearls.county (id, name, longfield, latfield, zoomlevel) VALUES (default, 'Pärnu', 24.500000, 58.383300, 10);
INSERT INTO pearls.county (id, name, longfield, latfield, zoomlevel) VALUES (default, 'Valga', 26.050000, 57.783300, 10);




INSERT INTO pearls.location (id, user_id, county_id, name, longfield, latfield, zoomlevel, status, teaser, extended_info, question, answer, date_added) VALUES (default, 1, 1, 'Viivikonna Ghost Town', 27.556000000000000, 59.287000000000000, 10, 'A', 'Echoes of Soviet ambition linger in the crumbling facades of a town time forgot.', 'Established in the 1950s for oil shale mining, Viivikonna thrived during the Soviet era. Post-independence, the mines closed, leading to mass exodus. Today, only a handful of residents remain amidst decaying buildings, making it Estonia''s most famous ghost town. The stark contrast between the remnants of bustling life and the encroaching nature offers a poignant glimpse into the transience of human endeavors.', 'What is the predominant architectural style of the apartment buildings in Viivikonna?', 'Stalinist / Stalinistic architecture', '2000-01-01');
INSERT INTO pearls.location (id, user_id, county_id, name, longfield, latfield, zoomlevel, status, teaser, extended_info, question, answer, date_added) VALUES (default, 1, 1, 'Paldiski Military Town', 24.078000000000000, 59.356000000000000, 10, 'A', 'Once a closed city shrouded in secrecy, now a testament to the Cold War''s silent battles.', 'Paldiski, during the Soviet era, was transformed into a significant naval base, housing nuclear submarine training facilities. The town was off-limits to outsiders, enveloped in secrecy. After the Soviet exit in 1994, many facilities were abandoned. Today, the town retains a unique atmosphere with its mix of decaying Soviet buildings and scenic coastal views, offering a glimpse into a once-hidden world.', 'What prominent structure stands at the tip of the Pakri Peninsula in Paldiski?', 'The Paldiski Lighthouse', '2016-05-18');
INSERT INTO pearls.location (id, user_id, county_id, name, longfield, latfield, zoomlevel, status, teaser, extended_info, question, answer, date_added) VALUES (default, 2, 6, 'Vastseliina Castle Ruins', 27.382000000000000, 57.729000000000000, 10, 'D', 'Perched on a hilltop, the remnants of a once-formidable fortress narrate tales of border skirmishes and medieval pilgrimages.', 'Constructed in 1342 by the Livonian Order, Vastseliina Castle served as a strategic border stronghold against Novgorod and Pskov. Beyond its military significance, it became a renowned pilgrimage site, attracting visitors seeking indulgences. Though partially destroyed over centuries, the ruins remain a poignant symbol of Estonia''s medieval heritage, offering panoramic views and a deep sense of history.', 'Which religious order was responsible for building Vastseliina Castle in the 14th century?', 'The Livonian Order', '2018-02-16');
INSERT INTO pearls.location (id, user_id, county_id, name, longfield, latfield, zoomlevel, status, teaser, extended_info, question, answer, date_added) VALUES (default, 2, 1, 'Murru Prison', 25.969000000000000, 58.655000000000000, 8, 'A', 'Beneath the shadows of crumbling limestone cliffs lies a forgotten place — where iron bars once echoed with footsteps and silence ruled the cells. Head west of Tallinn, to a ghost town swallowed by nature and history. Seek the sunken relic near the blue quarry waters... the old prison of Rummu awaits.', '"Once a fortress of iron and isolation, now a sunken relic swallowed by sand and time." Hidden in the quiet village of Rummu, within Harju County, lies the eerie remains of Murru vangla — a Soviet-era prison built in 1938. At its peak, it held hundreds of inmates, many of whom were forced to mine limestone from the adjacent quarry. The labor was brutal, the conditions bleak — but the operations continued through the Soviet occupation and beyond, until the prison finally closed its gates in 2012. When the pumps that kept the quarry dry were shut down, the pit flooded rapidly, drowning equipment and buildings under crystal-clear water. Today, the area is an unusual combination of decay and beauty — with sunken prison ruins, abandoned guard towers, and an artificial "mountain" of white limestone sand that has become an accidental landmark. Adventurers now dive where prisoners once toiled, swim through flooded corridors, and climb the surreal white dunes that overlook the lake. Once a place no one wanted to go... now a destination shrouded in mystery, thrill, and silence. Fun Fact: Parts of Tenet (2020) by Christopher Nolan were filmed in Estonia — and while Murru itself wasn’t used, the country’s haunting Soviet-era backdrops caught the eye of Hollywood.', 'What color is the water in the flooded quarry next to the ruins of Murru vangla?', 'Turquoise (or clear blue)', '2015-05-05');
INSERT INTO pearls.location (id, user_id, county_id, name, longfield, latfield, zoomlevel, status, teaser, extended_info, question, answer, date_added) VALUES (default, 2, 1, 'Hara Submarine Base', 25.617000000000000, 59.602000000000000, 10, 'A', 'Beneath the waves, secrets of the Cold War rust in silence.', 'Constructed in the 1950s, Hara Submarine Base was a strategic Soviet facility designed to demagnetize submarine hulls, reducing their detectability. The base was abandoned after the Soviet withdrawal, leaving behind decaying piers and structures, now popular among urban explorers. The juxtaposition of industrial decay against the serene coastal backdrop creates a surreal atmosphere, inviting contemplation of the past''s lingering presence.', ' What was the primary purpose of the Hara Submarine Base during its operational years?', 'Demagnetizing submarine hulls', '2025-05-06');
INSERT INTO pearls.location (id, user_id, county_id, name, longfield, latfield, zoomlevel, status, teaser, extended_info, question, answer, date_added) VALUES (default, 2, 7, 'Saka Manor', 27.067000000000000, 59.419000000000000, 10, 'A', 'Perched atop limestone cliffs, a manor whispers tales of nobility and wartime secrets.', 'Saka Manor, established in the 17th century, boasts a rich history intertwined with nobility and strategic military significance. Overlooking the Gulf of Finland, its location made it a valuable asset during various conflicts. After periods of neglect, the manor has been meticulously restored, blending historical architecture with modern amenities. Visitors can explore the manor''s storied past while enjoying panoramic views of the surrounding landscape.', 'What natural feature provides a panoramic view from Saka Manor''s grounds?', 'The limestone cliffs overlooking the Gulf of Finland', '2014-05-02');
INSERT INTO pearls.location (id, user_id, county_id, name, longfield, latfield, zoomlevel, status, teaser, extended_info, question, answer, date_added) VALUES (default, 3, 8, 'Põltsamaa Castle', 25.969000000000000, 58.655000000000000, 10, 'A', 'From medieval stronghold to royal residence, its stones echo with centuries of ambition and artistry.', 'Founded in 1272 by the Livonian Order, Põltsamaa Castle has undergone numerous transformations, reflecting the region''s tumultuous history. It served as the residence of Duke Magnus of Holstein in the 16th century and was later remodeled into a rococo palace in the 18th century. Despite suffering damage during WWII, restoration efforts have preserved its grandeur. Today, the castle complex offers visitors a journey through Estonia''s rich cultural tapestry.', 'Which historical figure made Põltsamaa Castle his residence in the 16th century?', 'Duke Magnus of Holstein', '2022-07-12');
INSERT INTO pearls.location (id, user_id, county_id, name, longfield, latfield, zoomlevel, status, teaser, extended_info, question, answer, date_added) VALUES (default, 3, 1, 'Patarei Sea Fortress & Prison', 32.843100000000000, 31.987100000000000, 12, 'A', 'Where the Baltic''s whispers echo through decaying cells, a fortress stands as a testament to shadows of the past.', 'Patarei Sea Fortress, constructed in the 1840s as a coastal defense structure, later transformed into one of the most notorious prisons during the Soviet era. Its imposing limestone walls have witnessed countless stories of despair and resilience. After Estonia regained independence, the prison was closed, leaving behind a haunting reminder of past regimes. Today, the fortress stands as a chilling monument, drawing visitors intrigued by its dark history and stark architecture.', 'What phrase is inscribed above the main entrance gate of Patarei Prison?', 'PATAREI MEREKINDLUS / Patarei Sea Fortress', '2020-07-11');
INSERT INTO pearls.location (id, user_id, county_id, name, longfield, latfield, zoomlevel, status, teaser, extended_info, question, answer, date_added) VALUES (default, 3, 2, 'Paluküla Church', 22.580000000000000, 58.893000000000000, 10, 'A', 'Amidst dense woodlands stands a solitary church, its tower once a beacon for sailors and a sentinel during wartime.', 'Founded in 1820 by the Ungern-Sternberg family, Paluküla Church lacks a surrounding cemetery due to high groundwater levels. During Soviet occupation, it was repurposed as a military warehouse, with its tower serving as an observation post. Despite a fire in 1989, restoration efforts have preserved its structure. Interestingly, the tower also functioned as a nautical navigation point, aligning with Hiiessaare Lighthouse, guiding mariners through treacherous waters.', 'What unique navigational role did Paluküla Church''s tower serve for sailors?', 'It acted as a rear sea mark in range with Hiiessaare Lighthouse.', '2006-10-10');
INSERT INTO pearls.location (id, user_id, county_id, name, longfield, latfield, zoomlevel, status, teaser, extended_info, question, answer, date_added) VALUES (default, 4, 4, 'Atla-Eeru Inn', 24.881000000000000, 59.055000000000000, 10, 'A', 'Within these aged walls, whispers of peasant revolts and clandestine gatherings linger, bearing witness to Estonia''s fight for freedom.', 'Built in 1811 and converted into an inn in 1841, the Atla-Eeru Inn played a pivotal role during the Mahtra War of 1858. It served as a meeting point where peasants studied the new Peasants'' Law, fueling their resolve against oppressive reforms. Post-uprising, the inn provided refuge and first aid to the wounded. Today, as part of the Mahtra Peasant Museum, it stands as a testament to the resilience and unity of Estonia''s rural communities.', 'Which 19th-century peasant uprising is closely associated with the Atla-Eeru Inn?', 'The Mahtra War', '2014-08-20');
INSERT INTO pearls.location (id, user_id, county_id, name, longfield, latfield, zoomlevel, status, teaser, extended_info, question, answer, date_added) VALUES (default, 4, 9, 'Kiipsaare Lighthouse', 21.821300000000000, 58.495600000000000, 10, 'A', 'Leaning into the sea''s embrace, a solitary sentinel defies time and tide.', 'Built in 1933 on the Harilaid Peninsula, Kiipsaare Lighthouse was initially situated 150 meters inland. Due to coastal erosion, it now stands offshore, leaning dramatically, earning it the nickname "Saaremaa''s Leaning Tower of Pisa." Though decommissioned, it remains a poignant symbol of nature''s relentless forces. Accessible only by foot through Vilsandi National Park, the journey to the lighthouse offers a blend of natural beauty and historical intrigue.', 'Why is Kiipsaare Lighthouse often referred to as the "Leaning Lighthouse"?', 'Because coastal erosion has caused it to tilt significantly offshore', '2021-11-20');
INSERT INTO pearls.location (id, user_id, county_id, name, longfield, latfield, zoomlevel, status, teaser, extended_info, question, answer, date_added) VALUES (default, 4, 2, 'Suuremõisa Manor', 22.755000000000000, 58.936000000000000, 10, 'A', 'Behind Baroque facades lie tales of nobility, shipwrecks, and hidden treasures, echoing the island''s storied past.', 'Constructed between 1755 and 1760 by Countess Ebba-Margaretha von Stenbock, Suuremõisa Manor is Hiiumaa''s grandest estate. Later owned by Baron Ungern-Sternberg, infamous for alleged shipwreck plundering, the manor''s attic is rumored to have hidden stolen treasures. Today, it houses educational institutions, but its architecture and legends continue to captivate visitors, offering a glimpse into the island''s aristocratic and tumultuous history.', 'Which notorious baron, associated with shipwreck plundering, once owned Suuremõisa Manor?', 'Baron Otto Reinhold Ludwig von Ungern-Sternberg', '2002-05-04');
INSERT INTO pearls.location (id, user_id, county_id, name, longfield, latfield, zoomlevel, status, teaser, extended_info, question, answer, date_added) VALUES (default, 4, 3, 'Rõngu Vassal Stronghold Ruins', 26.266000000000000, 58.143000000000000, 10, 'A', 'Amidst tranquil parklands lie the silent stones of a once-mighty bastion, echoing tales of medieval valor and Jesuit intrigue.', 'Nestled in the heart of Tartu County, the Rõngu Vassal Stronghold dates back to the 14th century. Initially constructed by the Tödwen family, this fortress later became a significant Jesuit center in South Estonia. Despite its destruction in 1558 during the Livonian War, remnants of its walls and main entrance still stand, offering visitors a tangible connection to Estonia''s layered past. The surrounding park provides a serene backdrop, inviting contemplation of the stronghold''s storied history.', 'What religious order transformed the Rõngu Stronghold into their South-Estonian center in the 16th century?', 'The Jesuits', '2025-05-14');


INSERT INTO pearls.keyword (id, location_id, keyword) VALUES (default, 1, 'stalinistic');
INSERT INTO pearls.keyword (id, location_id, keyword) VALUES (default, 1, 'stalinist');
INSERT INTO pearls.keyword (id, location_id, keyword) VALUES (default, 1, 'stalinistlik');
INSERT INTO pearls.keyword (id, location_id, keyword) VALUES (default, 2, 'lighthouse');
INSERT INTO pearls.keyword (id, location_id, keyword) VALUES (default, 2, 'tuletorn');
INSERT INTO pearls.keyword (id, location_id, keyword) VALUES (default, 3, 'livonian');
INSERT INTO pearls.keyword (id, location_id, keyword) VALUES (default, 3, 'liivi');
INSERT INTO pearls.keyword (id, location_id, keyword) VALUES (default, 4, 'turquoise');
INSERT INTO pearls.keyword (id, location_id, keyword) VALUES (default, 4, 'blue');
INSERT INTO pearls.keyword (id, location_id, keyword) VALUES (default, 4, 'sinine');
INSERT INTO pearls.keyword (id, location_id, keyword) VALUES (default, 4, 'türkiis');
INSERT INTO pearls.keyword (id, location_id, keyword) VALUES (default, 5, 'demagnetize');
INSERT INTO pearls.keyword (id, location_id, keyword) VALUES (default, 5, 'demagnetizing');
INSERT INTO pearls.keyword (id, location_id, keyword) VALUES (default, 5, 'demagnetiseerimine');
INSERT INTO pearls.keyword (id, location_id, keyword) VALUES (default, 6, 'limestone cliffs');
INSERT INTO pearls.keyword (id, location_id, keyword) VALUES (default, 6, 'cliffs');
INSERT INTO pearls.keyword (id, location_id, keyword) VALUES (default, 7, 'Magnus');
INSERT INTO pearls.keyword (id, location_id, keyword) VALUES (default, 7, 'Holstein');
INSERT INTO pearls.keyword (id, location_id, keyword) VALUES (default, 8, 'merekindlus');
INSERT INTO pearls.keyword (id, location_id, keyword) VALUES (default, 8, 'fortress');
INSERT INTO pearls.keyword (id, location_id, keyword) VALUES (default, 9, 'sea mark');
INSERT INTO pearls.keyword (id, location_id, keyword) VALUES (default, 10, 'mahtra');
INSERT INTO pearls.keyword (id, location_id, keyword) VALUES (default, 11, 'tilt');
INSERT INTO pearls.keyword (id, location_id, keyword) VALUES (default, 11, 'kaldusolek');
INSERT INTO pearls.keyword (id, location_id, keyword) VALUES (default, 11, 'kaldu');
INSERT INTO pearls.keyword (id, location_id, keyword) VALUES (default, 12, 'ungern-sternberg');
INSERT INTO pearls.keyword (id, location_id, keyword) VALUES (default, 12, 'otto');
INSERT INTO pearls.keyword (id, location_id, keyword) VALUES (default, 12, 'reinhold');
INSERT INTO pearls.keyword (id, location_id, keyword) VALUES (default, 12, 'ludwig');
INSERT INTO pearls.keyword (id, location_id, keyword) VALUES (default, 13, 'jesuiidid');
INSERT INTO pearls.keyword (id, location_id, keyword) VALUES (default, 13, 'jesuits');


INSERT INTO pearls.hint (id, location_id, hint) VALUES (default, 1, 'the name is derived from a not so nice guy');
INSERT INTO pearls.hint (id, location_id, hint) VALUES (default, 1, '..who had mustache');
INSERT INTO pearls.hint (id, location_id, hint) VALUES (default, 1, '..and ruled USSR during WW2');
INSERT INTO pearls.hint (id, location_id, hint) VALUES (default, 2, 'It serves as a beacon ');
INSERT INTO pearls.hint (id, location_id, hint) VALUES (default, 2, '..not bacon');
INSERT INTO pearls.hint (id, location_id, hint) VALUES (default, 3, 'when I hear the name I think of vodka');
INSERT INTO pearls.hint (id, location_id, hint) VALUES (default, 4, 'not so nice colour');
INSERT INTO pearls.hint (id, location_id, hint) VALUES (default, 4, 'not blue');
INSERT INTO pearls.hint (id, location_id, hint) VALUES (default, 4, 'not grey');
INSERT INTO pearls.hint (id, location_id, hint) VALUES (default, 5, 'the name consists of two parts. Second part is similar to a character from Xmen. ');
INSERT INTO pearls.hint (id, location_id, hint) VALUES (default, 6, 'there is a guy who sings about a devil woman with the 1st name we are looking for.');
INSERT INTO pearls.hint (id, location_id, hint) VALUES (default, 7, 'there is a chess player with similar first name');
INSERT INTO pearls.hint (id, location_id, hint) VALUES (default, 8, '4th studio album of Alter Bridge');
INSERT INTO pearls.hint (id, location_id, hint) VALUES (default, 8, 'Boeing B17 was called with the same name:  flying….');
INSERT INTO pearls.hint (id, location_id, hint) VALUES (default, 9, 'two word: first is a great body of salt water, second is …Zuckeberg');
INSERT INTO pearls.hint (id, location_id, hint) VALUES (default, 10, 'In this war the harshest punishments were given to Ado Andrei from Mahtra Manor and Peeter Olander from Kaiu Manor, each receiving 1,000 blows through the gauntlet, along with the loss of all class privileges, 20 years of hard labor, and subsequent exile to Siberia.');
INSERT INTO pearls.hint (id, location_id, hint) VALUES (default, 11, 'Pisa has similar issues');
INSERT INTO pearls.hint (id, location_id, hint) VALUES (default, 12, 'there is a guy who makes vacuum tube amplifiers with the same first name');
INSERT INTO pearls.hint (id, location_id, hint) VALUES (default, 13, 'the secret order that rules the world');
INSERT INTO pearls.hint (id, location_id, hint) VALUES (default, 13, 'there is a 1986 movie of same religious order called “the Mission” ');


INSERT INTO pearls.game (id, location_id, user_id, start_time, end_time, status, complete_date, hints_used, points)
VALUES (default, 1, 2, null, null, 'GA', null, 0,0);
INSERT INTO pearls.game (id, location_id, user_id, start_time, end_time, status, complete_date, hints_used, points)
VALUES (default, 3, 2, '2005-05-07 12:15:10.000000', null, 'GS', null, 0,0);
INSERT INTO pearls.game (id, location_id, user_id, start_time, end_time, status, complete_date, hints_used, points)
VALUES (default, 13, 2, '2015-09-12 01:01:12.000000', '2015-09-12 04:08:12.000000', 'GC', '2001-05-05', 0,70);
INSERT INTO pearls.game (id, location_id, user_id, start_time, end_time, status, complete_date, hints_used, points)
VALUES (default, 10, 2, '2015-09-12 01:01:12.000000', '2015-09-12 04:08:12.000000', 'GC', '2001-05-05', 0,100);
INSERT INTO pearls.game (id, location_id, user_id, start_time, end_time, status, complete_date, hints_used, points)
VALUES (default, 9, 2, '2015-09-12 01:01:12.000000', '2015-09-12 04:08:12.000000', 'GC', '2001-05-05', 1,55);
INSERT INTO pearls.game (id, location_id, user_id, start_time, end_time, status, complete_date, hints_used, points)
VALUES (default, 6, 4, '2015-09-12 01:01:12.000000', '2015-09-12 04:08:12.000000', 'GC', '2001-05-05', 0,5);
INSERT INTO pearls.game (id, location_id, user_id, start_time, end_time, status, complete_date, hints_used, points)
VALUES (default, 7, 4, '2015-09-12 01:01:12.000000', '2015-09-12 04:08:12.000000', 'GC', '2001-05-05', 0, 5);
INSERT INTO pearls.game (id, location_id, user_id, start_time, end_time, status, complete_date, hints_used, points)
VALUES (default, 8, 4, '2015-09-12 01:01:12.000000', '2015-09-12 04:08:12.000000', 'GC', '2001-05-05', 0,5);
INSERT INTO pearls.game (id, location_id, user_id, start_time, end_time, status, complete_date, hints_used, points)
VALUES (default, 9, 4, '2015-09-12 01:01:12.000000', '2015-09-12 04:08:12.000000', 'GC', '2001-05-05', 0,5);
INSERT INTO pearls.game (id, location_id, user_id, start_time, end_time, status, complete_date, hints_used, points)
VALUES (default, 10, 4, '2015-09-12 01:01:12.000000', '2015-09-12 04:08:12.000000', 'GC', '2001-05-05', 0,5);
INSERT INTO pearls.game (id, location_id, user_id, start_time, end_time, status, complete_date, hints_used, points)
VALUES (default, 11, 4, '2015-09-12 01:01:12.000000', '2015-09-12 04:08:12.000000', 'GC', '2001-05-05', 0,5);




INSERT INTO pearls.hint (id, location_id, hint)
VALUES (default, 1, 'Vaata maju');
INSERT INTO pearls.hint (id, location_id, hint)
VALUES (default, 1, 'Vaata aknaid');
INSERT INTO pearls.hint (id, location_id, hint)
VALUES (default, 1, 'Googelda totu');
INSERT INTO pearls.hint (id, location_id, hint)
VALUES (default, 2, 'Kuhu poole tipp j22b? Vaata sinna');
INSERT INTO pearls.hint (id, location_id, hint)
VALUES (default, 2, 'Mine sinna ja uuri!!');
INSERT INTO pearls.hint (id, location_id, hint)
VALUES (default, 3, 'Hint1');
INSERT INTO pearls.hint (id, location_id, hint)
VALUES (default, 4, 'Vihje 1');
INSERT INTO pearls.hint (id, location_id, hint)
VALUES (default, 5, 'Vihje 1');


INSERT INTO pearls.keyword (id, location_id, keyword)
VALUES (default, 1, 'Stalin');
INSERT INTO pearls.keyword (id, location_id, keyword)
VALUES (default, 1, 'stalin');
INSERT INTO pearls.keyword (id, location_id, keyword)
VALUES (default, 2, 'lighthouse');
INSERT INTO pearls.keyword (id, location_id, keyword)
VALUES (default, 2, 'tuletorn');
INSERT INTO pearls.keyword (id, location_id, keyword)
VALUES (default, 3, 'liivi');
INSERT INTO pearls.keyword (id, location_id, keyword)
VALUES (default, 3, 'livonian');
INSERT INTO pearls.keyword (id, location_id, keyword)
VALUES (default, 4, 'turkiis');
INSERT INTO pearls.keyword (id, location_id, keyword)
VALUES (default, 4, 'türkiis');
INSERT INTO pearls.keyword (id, location_id, keyword)
VALUES (default, 4, 'clear blue');
INSERT INTO pearls.keyword (id, location_id, keyword)
VALUES (default, 4, 'turquoise');
INSERT INTO pearls.keyword (id, location_id, keyword)
VALUES (default, 6, 'limestone');
INSERT INTO pearls.keyword (id, location_id, keyword)
VALUES (default, 6, 'paekivi');
INSERT INTO pearls.keyword (id, location_id, keyword)
VALUES (default, 6, 'cliff');
INSERT INTO pearls.keyword (id, location_id, keyword)
VALUES (default, 6, 'pank');
INSERT INTO pearls.keyword (id, location_id, keyword)
VALUES (default, 6, 'laht');
INSERT INTO pearls.keyword (id, location_id, keyword)
VALUES (default, 6, 'gulf');
