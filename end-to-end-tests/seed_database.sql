INSERT INTO "Surveys" VALUES (1, 'Kysely', '2021-02-26T14:15:52+0200', '2021-02-26T14:15:55+0200');
INSERT INTO "Survey_results" VALUES (1, 1, 'Vappufiiliksesi on heikko.', 0.5, '2021-02-26T14:15:52+0200', '2021-02-26T14:15:55+0200');
INSERT INTO "Survey_results" VALUES (2, 1, 'Hmmm... ihan siis, ihan siis jeppinen vappufiilis!', 0.7, '2021-02-26T14:15:52+0200', '2021-02-26T14:15:55+0200');
INSERT INTO "Survey_results" VALUES (3, 1, 'Hippulihei rillumarei! Asiallista vappumeisinkia!!', 1.0, '2021-02-26T14:15:52+0200', '2021-02-26T14:15:55+0200');

INSERT INTO "Categories" VALUES (10, 'Olotila', 'kehollisessa yleistuntemuksessa vapuhtavia merkkeja voi tunnistaa yleisessa energisyydessa, menojalan vipatuksessa seka, parhaimmillaan, vienossa skumpan porinassa kurkunpaan alueella.', '2021-02-26T14:15:52+0200', '2021-02-26T14:15:55+0200');
INSERT INTO "Category_results" VALUES (1, 10, 'Olet paaryna', 0.5, '2021-02-26T14:15:52+0200', '2021-02-26T14:15:55+0200');
INSERT INTO "Category_results" VALUES (2, 10, 'Olet leipa', 1, '2021-02-26T14:15:52+0200', '2021-02-26T14:15:55+0200');

INSERT INTO "Categories" VALUES (11 , 'Mielentila', 'mielentilallisesti mikali vappu porisee korvien valissa, yleensa ilmenee jonkinasteista innostuneisuutta ja odottavaa tunnetta. Varsin tunnusmaista on myos erilaisten vappuun liittyvien mielikuvien ilmeneminen ajatuksiin, joskus jopa uniin asti.', '2021-02-26T14:15:52+0200', '2021-02-26T14:15:55+0200');
INSERT INTO "Category_results" VALUES (3, 11, 'Mielentilasi on heikko', 0.5, '2021-02-26T14:15:52+0200', '2021-02-26T14:15:55+0200');
INSERT INTO "Category_results" VALUES (4, 11, 'Mielentilasi on vahva', 1, '2021-02-26T14:15:52+0200', '2021-02-26T14:15:55+0200');

INSERT INTO "Questions" VALUES (1, 'Ajatus vihrealla nurmella villisti kierimisesta viehattaa minua', 1, '[ {"category": "Olotila", "multiplier": 1} , {"category": "Mielentila", "multiplier": 0.5} ]', '2021-02-26T14:15:52+0200', '2021-02-26T14:15:55+0200');
INSERT INTO "Questions" VALUES (2, 'Suutani kuivaa tavalla, jonka voi taltuttaa vain poreileva juoma', 1, '[ {"category": "Olotila", "multiplier": 1} , {"category": "Mielentila", "multiplier": 0.5} ]', '2021-02-26T14:15:52+0200', '2021-02-26T14:15:55+0200');
INSERT INTO "Questions" VALUES (3, 'Auringon nayttaytyessa ajatukseni singahtavat vappupirskeunelmiin valittomasti', 1, '[ {"category": "Olotila", "multiplier": 1} , {"category": "Mielentila", "multiplier": 0.5} ]', '2021-02-26T14:15:52+0200', '2021-02-26T14:15:55+0200');
INSERT INTO "Questions" VALUES (4, 'Bilejalka vipeltaa jo vimmatusti', 1, '[{"category": "Olotila", "multiplier": 1}, {"category": "Mielentila", "multiplier": 0.5}]','2021-02-26T14:15:52+0200', '2021-02-26T14:15:55+0200');

INSERT INTO "Question_answers" VALUES (101, 'Ehdottomasti', 1, 1, '2021-02-26T14:15:52+0200', '2021-02-26T14:15:55+0200');
INSERT INTO "Question_answers" VALUES (102, 'Ehka', 1, 1, '2021-02-26T14:15:52+0200', '2021-02-26T14:15:55+0200');
INSERT INTO "Question_answers" VALUES (103, 'Ei missaan tapauksessa', 1, 1, '2021-02-26T14:15:52+0200', '2021-02-26T14:15:55+0200');

INSERT INTO "Question_answers" VALUES (201, 'Ehdottomasti', 1, 2, '2021-02-26T14:15:52+0200', '2021-02-26T14:15:55+0200');
INSERT INTO "Question_answers" VALUES (202, 'Ehka', 1, 2, '2021-02-26T14:15:52+0200', '2021-02-26T14:15:55+0200');
INSERT INTO "Question_answers" VALUES (203, 'Ei missaan tapauksessa', 1, 2, '2021-02-26T14:15:52+0200', '2021-02-26T14:15:55+0200');

INSERT INTO "Question_answers" VALUES (301, 'Aina', 1, 3, '2021-02-26T14:15:52+0200', '2021-02-26T14:15:55+0200');
INSERT INTO "Question_answers" VALUES (302, 'Usein', 1, 3, '2021-02-26T14:15:52+0200', '2021-02-26T14:15:55+0200');
INSERT INTO "Question_answers" VALUES (303, 'Silloin talloin', 1, 3, '2021-02-26T14:15:52+0200', '2021-02-26T14:15:55+0200');
INSERT INTO "Question_answers" VALUES (304, 'Ei niin usein', 1, 3, '2021-02-26T14:15:52+0200', '2021-02-26T14:15:55+0200');
INSERT INTO "Question_answers" VALUES (305, 'Harvoin', 1, 3, '2021-02-26T14:15:52+0200', '2021-02-26T14:15:55+0200');
INSERT INTO "Question_answers" VALUES (306, 'Ei koskaan', 1, 3, '2021-02-26T14:15:52+0200', '2021-02-26T14:15:55+0200');

INSERT INTO "Question_answers" VALUES (401, 'Todellakin', 1, 4, '2021-02-26T14:15:52+0200', '2021-02-26T14:15:55+0200');
INSERT INTO "Question_answers" VALUES (402, 'No Ei', 1, 4, '2021-02-26T14:15:52+0200', '2021-02-26T14:15:55+0200');

INSERT INTO "Users" VALUES (1000, 'maili@maili.com', null, null, '2021-03-01T09:53:45+0000', '2021-03-01T09:53:45+0000');