-- PRAEGU EI TASU NÄPPIDA
/* comment IN, kui jõuame useriteni
INSERT INTO public.role (id, name)
VALUES (default, 'admin');
INSERT INTO public.role (id, name)
VALUES (default, 'teacher');
*/


INSERT INTO public.category (id, name, description, is_active) VALUES (default, 'Heli', 'See mäng on heli baasil', true);
INSERT INTO public.category (id, name, description, is_active) VALUES (default, 'Video', 'See mäng on video baasil', true);
INSERT INTO public.category (id, name, description, is_active) VALUES (default, 'Pilt', 'See mäng on pildi baasil', true);

INSERT INTO public.game (id, name, category_id, description, is_active) VALUES (default, 'Mida näed pildilt?' , 1, 'Mida see pilt sind tundma paneb? Kas sinu emotsiooni mõjutab fakt, et pilt on värvitu/värviline?', true);
INSERT INTO public.game (id, name, category_id, description, is_active) VALUES (default, 'Mida näed pildilt?' , 2, 'Mida see video sind tundma paneb? Kas sinu emotsiooni mõjutab fakt, et video on värvitu/värviline?', true);
INSERT INTO public.game (id, name, category_id, description, is_active) VALUES (default, 'Mida näed pildilt?' , 3, 'Mida see heli sind tundma paneb? Kas sinu emotsiooni mõjutab fakt, et heli on efektiga/ilma?', true);


INSERT INTO public.game_step (id, game_id, step_order) VALUES (default, 1, 1);
INSERT INTO public.game_step (id, game_id, step_order) VALUES (default, 2, 1);
INSERT INTO public.game_step (id, game_id, step_order) VALUES (default, 3, 1);


INSERT INTO public.discussion_point (id, game_step_id, discussion_text, is_active, discussion_order) VALUES (default, 1, 'Küsi lastelt, mis emotsioone see pilt tekitab.', true, 1);
INSERT INTO public.discussion_point (id, game_step_id, discussion_text, is_active, discussion_order) VALUES (default, 1, 'Teine küsimus.', true, 3);
INSERT INTO public.discussion_point (id, game_step_id, discussion_text, is_active, discussion_order) VALUES (default, 1, 'Kolmas vestlus.', false, 2);


INSERT INTO public.media (id, game_step_id, media_type, file_url) VALUES (default, 1, 'image', '/media/images/Raul.png');


INSERT INTO public.question(id, game_step_id, question_text, is_active, question_order) VALUES (default, 1, 'Mis on pildil?', true, 1);
INSERT INTO public.question(id, game_step_id, question_text, is_active, question_order) VALUES (default, 1, 'Kes on pildil?', true, 2);
INSERT INTO public.question(id, game_step_id, question_text, is_active, question_order) VALUES (default, 1, 'Miks pilt eksisteerib?', false, 3);
INSERT INTO public.question(id, game_step_id, question_text, is_active, question_order) VALUES (default, 2, 'Mis on pildil?', true, 1);