-- ============================================================
-- INDIAN LEGAL INTELLIGENCE DATABASE - SEED DATA
-- Comprehensive data for all major law categories
-- ============================================================

-- ============================================================
-- INSERT: LAW DOMAINS
-- ============================================================

INSERT INTO law_domains (domain_name, domain_code, description, icon, priority_order) VALUES
('Criminal Law', 'CRIMINAL', 'Laws governing crimes, punishments, and criminal procedures in India including BNS, BNSS, and BSA', 'gavel', 1),
('Cyber Law', 'CYBER', 'Laws governing electronic commerce, digital signatures, cybercrime, and information technology', 'shield', 2),
('Constitutional Law', 'CONSTITUTIONAL', 'The supreme law of India establishing the framework of government and fundamental rights', 'landmark', 3),
('Corporate & Commercial Law', 'CORPORATE', 'Laws governing companies, businesses, partnerships, insolvency, and competition', 'building', 4),
('Family Law', 'FAMILY', 'Laws governing marriage, divorce, succession, adoption, and guardianship', 'users', 5),
('Property Law', 'PROPERTY', 'Laws governing transfer, ownership, registration, and regulation of property', 'home', 6),
('Labour & Employment Law', 'LABOUR', 'Laws governing employment relationships, wages, disputes, and worker welfare', 'hard-hat', 7),
('Taxation Law', 'TAXATION', 'Laws governing income tax, GST, and other forms of taxation', 'receipt', 8),
('Environmental Law', 'ENVIRONMENTAL', 'Laws governing environmental protection, pollution control, and natural resources', 'leaf', 9),
('Consumer Protection', 'CONSUMER', 'Laws protecting consumer rights against unfair trade practices and defective goods/services', 'shield-check', 10),
('Banking & Finance Law', 'BANKING', 'Laws governing banking operations, financial institutions, and debt recovery', 'bank', 11);

-- ============================================================
-- INSERT: ACTS
-- ============================================================

-- Criminal Law Acts
INSERT INTO acts (domain_id, act_name, short_name, act_code, year, status, description, ministry) VALUES
((SELECT id FROM law_domains WHERE domain_code = 'CRIMINAL'), 
 'Bharatiya Nyaya Sanhita', 'BNS', 'BNS2023', 2023, 'active', 
 'The new Indian Penal Code replacing IPC 1860, defining offences and punishments under Indian criminal law',
 'Ministry of Home Affairs'),

((SELECT id FROM law_domains WHERE domain_code = 'CRIMINAL'), 
 'Bharatiya Nagarik Suraksha Sanhita', 'BNSS', 'BNSS2023', 2023, 'active', 
 'The new Code of Criminal Procedure replacing CrPC 1973, governing criminal court procedures',
 'Ministry of Home Affairs'),

((SELECT id FROM law_domains WHERE domain_code = 'CRIMINAL'), 
 'Bharatiya Sakshya Adhiniyam', 'BSA', 'BSA2023', 2023, 'active', 
 'The new Indian Evidence Act replacing IEA 1872, governing rules of evidence in courts',
 'Ministry of Home Affairs');

-- Cyber Law Acts
INSERT INTO acts (domain_id, act_name, short_name, act_code, year, status, description, ministry) VALUES
((SELECT id FROM law_domains WHERE domain_code = 'CYBER'), 
 'Information Technology Act', 'IT Act', 'ITA2000', 2000, 'active', 
 'Primary law governing electronic governance, cybercrime, e-commerce, and digital signatures in India',
 'Ministry of Electronics and IT');

-- Constitutional Law Acts
INSERT INTO acts (domain_id, act_name, short_name, act_code, year, status, description, ministry) VALUES
((SELECT id FROM law_domains WHERE domain_code = 'CONSTITUTIONAL'), 
 'Constitution of India', 'Constitution', 'COI1950', 1950, 'active', 
 'The supreme law of India laying down the framework of political principles, government structure, and fundamental rights',
 'Ministry of Law and Justice');

-- Corporate Law Acts
INSERT INTO acts (domain_id, act_name, short_name, act_code, year, status, description, ministry) VALUES
((SELECT id FROM law_domains WHERE domain_code = 'CORPORATE'), 
 'Companies Act', 'Companies Act', 'CA2013', 2013, 'active', 
 'Primary legislation governing incorporation, operation, and winding up of companies in India',
 'Ministry of Corporate Affairs'),

((SELECT id FROM law_domains WHERE domain_code = 'CORPORATE'), 
 'Insolvency and Bankruptcy Code', 'IBC', 'IBC2016', 2016, 'active', 
 'Consolidates insolvency laws and provides time-bound resolution for insolvent companies and individuals',
 'Ministry of Corporate Affairs'),

((SELECT id FROM law_domains WHERE domain_code = 'CORPORATE'), 
 'Competition Act', 'Competition Act', 'COMP2002', 2002, 'active', 
 'Prevents anti-competitive practices and promotes fair competition in markets',
 'Ministry of Corporate Affairs'),

((SELECT id FROM law_domains WHERE domain_code = 'CORPORATE'), 
 'Limited Liability Partnership Act', 'LLP Act', 'LLP2008', 2008, 'active', 
 'Governs formation and operation of Limited Liability Partnerships in India',
 'Ministry of Corporate Affairs');

-- Family Law Acts
INSERT INTO acts (domain_id, act_name, short_name, act_code, year, status, description, ministry) VALUES
((SELECT id FROM law_domains WHERE domain_code = 'FAMILY'), 
 'Hindu Marriage Act', 'HMA', 'HMA1955', 1955, 'active', 
 'Codifies law relating to marriage among Hindus, Buddhists, Jains, and Sikhs',
 'Ministry of Law and Justice'),

((SELECT id FROM law_domains WHERE domain_code = 'FAMILY'), 
 'Special Marriage Act', 'SMA', 'SMA1954', 1954, 'active', 
 'Provides for civil marriage regardless of religion and inter-religious marriages',
 'Ministry of Law and Justice'),

((SELECT id FROM law_domains WHERE domain_code = 'FAMILY'), 
 'Hindu Succession Act', 'HSA', 'HSA1956', 1956, 'active', 
 'Governs intestate succession among Hindus, including property rights of daughters',
 'Ministry of Law and Justice'),

((SELECT id FROM law_domains WHERE domain_code = 'FAMILY'), 
 'Guardians and Wards Act', 'GWA', 'GWA1890', 1890, 'active', 
 'Provides for appointment of guardians for minors and their property',
 'Ministry of Law and Justice');

-- Property Law Acts
INSERT INTO acts (domain_id, act_name, short_name, act_code, year, status, description, ministry) VALUES
((SELECT id FROM law_domains WHERE domain_code = 'PROPERTY'), 
 'Transfer of Property Act', 'TPA', 'TPA1882', 1882, 'active', 
 'Governs transfer of property by act of parties including sale, mortgage, lease, and gift',
 'Ministry of Law and Justice'),

((SELECT id FROM law_domains WHERE domain_code = 'PROPERTY'), 
 'Registration Act', 'Registration Act', 'REG1908', 1908, 'active', 
 'Mandates registration of documents relating to immovable property',
 'Ministry of Law and Justice'),

((SELECT id FROM law_domains WHERE domain_code = 'PROPERTY'), 
 'Real Estate (Regulation and Development) Act', 'RERA', 'RERA2016', 2016, 'active', 
 'Regulates real estate sector to protect homebuyers and ensure transparency',
 'Ministry of Housing and Urban Affairs');

-- Labour Law Acts
INSERT INTO acts (domain_id, act_name, short_name, act_code, year, status, description, ministry) VALUES
((SELECT id FROM law_domains WHERE domain_code = 'LABOUR'), 
 'Industrial Disputes Act', 'ID Act', 'IDA1947', 1947, 'active', 
 'Provides machinery for investigation and settlement of industrial disputes',
 'Ministry of Labour and Employment'),

((SELECT id FROM law_domains WHERE domain_code = 'LABOUR'), 
 'Minimum Wages Act', 'MW Act', 'MWA1948', 1948, 'active', 
 'Provides for fixing minimum rates of wages in certain employments',
 'Ministry of Labour and Employment'),

((SELECT id FROM law_domains WHERE domain_code = 'LABOUR'), 
 'Code on Wages', 'Wage Code', 'COW2019', 2019, 'active', 
 'Consolidates laws relating to wages, bonus, and payment of wages',
 'Ministry of Labour and Employment'),

((SELECT id FROM law_domains WHERE domain_code = 'LABOUR'), 
 'Employees Provident Funds and Miscellaneous Provisions Act', 'EPF Act', 'EPF1952', 1952, 'active', 
 'Provides for provident funds, pension, and insurance for employees',
 'Ministry of Labour and Employment');

-- Taxation Law Acts
INSERT INTO acts (domain_id, act_name, short_name, act_code, year, status, description, ministry) VALUES
((SELECT id FROM law_domains WHERE domain_code = 'TAXATION'), 
 'Income-tax Act', 'IT Act', 'ITA1961', 1961, 'active', 
 'Primary legislation governing income tax in India for individuals, companies, and other entities',
 'Ministry of Finance'),

((SELECT id FROM law_domains WHERE domain_code = 'TAXATION'), 
 'Central Goods and Services Tax Act', 'CGST Act', 'CGST2017', 2017, 'active', 
 'Governs levy and collection of GST on intra-state supply of goods and services',
 'Ministry of Finance');

-- Environmental Law Acts
INSERT INTO acts (domain_id, act_name, short_name, act_code, year, status, description, ministry) VALUES
((SELECT id FROM law_domains WHERE domain_code = 'ENVIRONMENTAL'), 
 'Environment (Protection) Act', 'EPA', 'EPA1986', 1986, 'active', 
 'Umbrella legislation for environmental protection empowering central government',
 'Ministry of Environment, Forest and Climate Change'),

((SELECT id FROM law_domains WHERE domain_code = 'ENVIRONMENTAL'), 
 'Water (Prevention and Control of Pollution) Act', 'Water Act', 'WPA1974', 1974, 'active', 
 'Provides for prevention and control of water pollution and maintenance of water quality',
 'Ministry of Environment, Forest and Climate Change');

-- Consumer Protection Acts
INSERT INTO acts (domain_id, act_name, short_name, act_code, year, status, description, ministry) VALUES
((SELECT id FROM law_domains WHERE domain_code = 'CONSUMER'), 
 'Consumer Protection Act', 'CPA', 'CPA2019', 2019, 'active', 
 'Protects consumer rights, establishes Consumer Protection Councils and Consumer Disputes Redressal Forums',
 'Ministry of Consumer Affairs');

-- Banking Law Acts
INSERT INTO acts (domain_id, act_name, short_name, act_code, year, status, description, ministry) VALUES
((SELECT id FROM law_domains WHERE domain_code = 'BANKING'), 
 'Reserve Bank of India Act', 'RBI Act', 'RBI1934', 1934, 'active', 
 'Establishes RBI and governs its functions as the central bank of India',
 'Ministry of Finance'),

((SELECT id FROM law_domains WHERE domain_code = 'BANKING'), 
 'Securitisation and Reconstruction of Financial Assets and Enforcement of Security Interest Act', 
 'SARFAESI Act', 'SARFAESI2002', 2002, 'active', 
 'Enables banks and financial institutions to recover NPAs without court intervention',
 'Ministry of Finance');

-- ============================================================
-- INSERT: SECTIONS - BHARATIYA NYAYA SANHITA (BNS)
-- ============================================================

INSERT INTO sections (act_id, chapter_number, chapter_title, section_number, title, content, punishment, punishment_type, offence_type, keywords) VALUES

-- BNS Chapter 1 - General
((SELECT id FROM acts WHERE act_code = 'BNS2023'), 'I', 'Preliminary', '1', 
'Short title, commencement and application',
'This Sanhita may be called the Bharatiya Nyaya Sanhita, 2023. It shall come into force on such date as the Central Government may notify. Every person shall be liable to punishment under this Sanhita for every act or omission contrary to the provisions thereof.',
NULL, 'none', 'none',
'commencement, application, jurisdiction, territorial, applicability'),

((SELECT id FROM acts WHERE act_code = 'BNS2023'), 'II', 'General Explanations', '6',
'Definitions',
'In this Sanhita— "Child" means any person below the age of eighteen years; "Court" means a Judge or Magistrate; "Document" denotes any matter expressed or described upon any substance by letters, figures or marks; "Government" includes Central Government and State Government; "Movable property" includes corporeal property except land and things attached to earth.',
NULL, 'none', 'none',
'definitions, child, court, document, government, movable property, interpretation'),

-- BNS Murder and Culpable Homicide
((SELECT id FROM acts WHERE act_code = 'BNS2023'), 'VI', 'Of Offences Affecting the Human Body', '101',
'Murder',
'Whoever causes death by doing an act with the intention of causing death, or with the intention of causing such bodily injury as the offender knows to be likely to cause the death of the person to whom the harm is caused, or with the intention of causing bodily injury to any person and the bodily injury intended to be inflicted is sufficient in the ordinary course of nature to cause death, commits murder.',
'Death or imprisonment for life, and shall also be liable to fine', 'both', 'cognizable',
'murder, culpable homicide, death, killing, intention, bodily injury, homicide'),

((SELECT id FROM acts WHERE act_code = 'BNS2023'), 'VI', 'Of Offences Affecting the Human Body', '100',
'Culpable homicide',
'Whoever causes death by doing an act with the intention of causing death, or with the intention of causing such bodily injury as is likely to cause death, or with the knowledge that he is likely by such act to cause death, commits the offence of culpable homicide.',
'Imprisonment for life, or imprisonment up to 10 years, and fine', 'both', 'cognizable',
'culpable homicide, death, intention, knowledge, bodily injury'),

((SELECT id FROM acts WHERE act_code = 'BNS2023'), 'VI', 'Of Offences Affecting the Human Body', '103',
'Punishment for murder',
'Whoever commits murder shall be punished with death or imprisonment for life, and shall also be liable to fine.',
'Death or imprisonment for life and fine', 'both', 'non_bailable',
'murder punishment, death penalty, capital punishment, life imprisonment'),

-- BNS Sexual Offences
((SELECT id FROM acts WHERE act_code = 'BNS2023'), 'V', 'Of Offences Against Woman and Child', '63',
'Rape',
'A man is said to commit "rape" if he penetrates his penis, to any extent, into the vagina, mouth, urethra or anus of a woman or makes her to do so with him or any other person; or inserts, any object or a part of the body, not being the penis, into the vagina, the urethra or anus of a woman or makes her to do so with him or any other person; or manipulates any part of the body of a woman so as to cause penetration into the vagina, urethra, anus or any part of body of such woman or makes her to do so with him or any other person; or applies his mouth to the vagina, anus, urethra of a woman or makes her to do so with him or any other person, under certain circumstances.',
'Rigorous imprisonment not less than 10 years extendable to life imprisonment and fine', 'both', 'non_bailable',
'rape, sexual assault, sexual violence, consent, penetration, woman, POCSO'),

((SELECT id FROM acts WHERE act_code = 'BNS2023'), 'V', 'Of Offences Against Woman and Child', '64',
'Punishment for rape',
'Whoever commits rape shall be punished with rigorous imprisonment of either description for a term which shall not be less than ten years, but which may extend to imprisonment for life, and shall also be liable to fine.',
'RI not less than 10 years, may extend to life imprisonment, and fine', 'both', 'non_bailable',
'rape punishment, sexual offence, rigorous imprisonment, fine'),

-- BNS Theft and Property Offences
((SELECT id FROM acts WHERE act_code = 'BNS2023'), 'XVII', 'Of Offences Against Property', '303',
'Theft',
'Whoever, intending to take dishonestly any movable property out of the possession of any person without that person''s consent, moves that property in order to such taking, is said to commit theft.',
'Imprisonment up to 3 years, or fine, or both', 'both', 'non_cognizable',
'theft, stealing, dishonest, movable property, possession, consent'),

((SELECT id FROM acts WHERE act_code = 'BNS2023'), 'XVII', 'Of Offences Against Property', '309',
'Robbery',
'In all robbery there is either theft or extortion. When theft is robbery: Theft is "robbery" if, in order to the committing of the theft, or in committing the theft, or in carrying away or attempting to carry away property obtained by the theft, the offender, for that end, voluntarily causes or attempts to cause to any person death or hurt or wrongful restraint, or fear of instant death or of instant hurt, or of instant wrongful restraint.',
'Rigorous imprisonment up to 10 years and fine; if on highway between sunset and sunrise, up to 14 years', 'both', 'cognizable',
'robbery, theft, extortion, violence, hurt, fear, highway robbery'),

((SELECT id FROM acts WHERE act_code = 'BNS2023'), 'XVII', 'Of Offences Against Property', '310',
'Dacoity',
'When five or more persons conjointly commit or attempt to commit a robbery, or where the whole number of persons conjointly committing or attempting to commit a robbery, and persons present and aiding such commission or attempt, amount to five or more, every person so committing, attempting or aiding, is said to commit "dacoity".',
'Imprisonment for life or rigorous imprisonment up to 10 years and fine', 'both', 'cognizable',
'dacoity, gang robbery, five persons, conjoint robbery, organized crime'),

-- BNS Cheating and Fraud
((SELECT id FROM acts WHERE act_code = 'BNS2023'), 'XVII', 'Of Offences Against Property', '318',
'Cheating',
'Whoever, by deceiving any person, fraudulently or dishonestly induces the person so deceived to deliver any property to any person, or to consent that any person shall retain any property, or intentionally induces the person so deceived to do or omit to do anything which he would not do or omit if he were not so deceived, and which act or omission causes or is likely to cause damage or harm to that person in body, mind, reputation or property, is said to "cheat".',
'Imprisonment up to 3 years, or fine, or both', 'both', 'non_cognizable',
'cheating, fraud, deception, dishonest, inducement, property, damage'),

((SELECT id FROM acts WHERE act_code = 'BNS2023'), 'XVII', 'Of Offences Against Property', '316',
'Criminal breach of trust',
'Whoever, being in any manner entrusted with property, or with any dominion over property, dishonestly misappropriates or converts to his own use that property, or dishonestly uses or disposes of that property in violation of any direction of law prescribing the mode in which such trust is to be discharged, or of any legal contract, express or implied, which he has made touching the discharge of such trust, or wilfully suffers any other person so to do, commits "criminal breach of trust".',
'Imprisonment up to 3 years, or fine, or both', 'both', 'non_cognizable',
'criminal breach of trust, misappropriation, entrustment, fiduciary, property'),

-- BNS Assault and Hurt
((SELECT id FROM acts WHERE act_code = 'BNS2023'), 'VI', 'Of Offences Affecting the Human Body', '115',
'Voluntarily causing hurt',
'Whoever does any act with the intention of thereby causing hurt to any person, or with the knowledge that he is thereby likely to cause hurt to any person, and does thereby cause hurt to any person, is said "voluntarily to cause hurt".',
'Imprisonment up to 1 year, or fine up to Rs. 10,000, or both', 'both', 'non_cognizable',
'hurt, assault, bodily pain, injury, voluntary, intention'),

((SELECT id FROM acts WHERE act_code = 'BNS2023'), 'VI', 'Of Offences Affecting the Human Body', '117',
'Voluntarily causing grievous hurt',
'Whoever voluntarily causes hurt, if the hurt which he intends to cause or knows himself to be likely to cause is grievous hurt, and if the hurt which he causes is grievous hurt, is said "voluntarily to cause grievous hurt".',
'Imprisonment up to 7 years and fine', 'both', 'cognizable',
'grievous hurt, serious injury, permanent damage, disfigurement, assault'),

-- BNS Defamation
((SELECT id FROM acts WHERE act_code = 'BNS2023'), 'XIX', 'Of Criminal Intimidation, Insult and Annoyance', '356',
'Defamation',
'Whoever, by words either spoken or intended to be read, or by signs or by visible representations, makes or publishes any imputation concerning any person intending to harm, or knowing or having reason to believe that such imputation will harm, the reputation of such person, is said to defame that person.',
'Simple imprisonment up to 2 years, or fine, or both', 'both', 'non_cognizable',
'defamation, reputation, libel, slander, imputation, publishing, harm');

-- ============================================================
-- INSERT: SECTIONS - INFORMATION TECHNOLOGY ACT
-- ============================================================

INSERT INTO sections (act_id, chapter_number, chapter_title, section_number, title, content, punishment, punishment_type, offence_type, keywords) VALUES

((SELECT id FROM acts WHERE act_code = 'ITA2000'), 'IX', 'Penalties, Compensation and Adjudication', '43',
'Penalty and compensation for damage to computer, computer system, etc.',
'If any person without permission of the owner or any other person who is incharge of a computer, computer system or computer network— (a) accesses or secures access to such computer, computer system or computer network; (b) downloads, copies or extracts any data; (c) introduces any computer contaminant or computer virus; (d) damages or causes to be damaged any computer; (e) disrupts or causes disruption of any computer; (f) denies or causes the denial of access to any person authorised to access; (g) provides any assistance to any person to facilitate access; (h) charges the services availed of by a person to the account of another person— he shall be liable to pay damages by way of compensation to the person so affected.',
'Compensation up to Rs. 1 crore', 'fine', 'civil',
'hacking, unauthorized access, computer damage, virus, data theft, cyber crime'),

((SELECT id FROM acts WHERE act_code = 'ITA2000'), 'XI', 'Offences', '66',
'Computer related offences',
'If any person, dishonestly or fraudulently, does any act referred to in section 43, he shall be punishable with imprisonment for a term which may extend to three years or with fine which may extend to five lakh rupees or with both.',
'Imprisonment up to 3 years, or fine up to Rs. 5 lakh, or both', 'both', 'cognizable',
'computer offence, hacking, fraud, dishonest, unauthorized access, cyber crime'),

((SELECT id FROM acts WHERE act_code = 'ITA2000'), 'XI', 'Offences', '66A',
'Punishment for sending offensive messages through communication service, etc.',
'[Struck down by Supreme Court in Shreya Singhal v. Union of India (2015)] Any person who sends by means of a computer resource or a communication device— (a) any information that is grossly offensive or has menacing character; or (b) any information which he knows to be false, but for the purpose of causing annoyance, inconvenience, danger, obstruction, insult, injury, criminal intimidation, enmity, hatred or ill will.',
'Imprisonment up to 3 years and fine - STRUCK DOWN', 'both', 'cognizable',
'offensive message, online harassment, 66A, struck down, unconstitutional, free speech'),

((SELECT id FROM acts WHERE act_code = 'ITA2000'), 'XI', 'Offences', '66C',
'Punishment for identity theft',
'Whoever, fraudulently or dishonestly make use of the electronic signature, password or any other unique identification feature of any other person, shall be punished with imprisonment of either description for a term which may extend to three years and shall also be liable to fine which may extend to rupees one lakh.',
'Imprisonment up to 3 years and fine up to Rs. 1 lakh', 'both', 'cognizable',
'identity theft, password theft, electronic signature, fraud, impersonation'),

((SELECT id FROM acts WHERE act_code = 'ITA2000'), 'XI', 'Offences', '66D',
'Punishment for cheating by personation by using computer resource',
'Whoever, by means of any communication device or computer resource cheats by personation, shall be punished with imprisonment of either description for a term which may extend to three years and shall also be liable to fine which may extend to one lakh rupees.',
'Imprisonment up to 3 years and fine up to Rs. 1 lakh', 'both', 'cognizable',
'online cheating, personation, impersonation, fraud, phishing, cyber fraud'),

((SELECT id FROM acts WHERE act_code = 'ITA2000'), 'XI', 'Offences', '66E',
'Punishment for violation of privacy',
'Whoever, intentionally or knowingly captures, publishes or transmits the image of a private area of any person without his or her consent, under circumstances violating the privacy of that person, shall be punished with imprisonment which may extend to three years or with fine not exceeding two lakh rupees, or with both.',
'Imprisonment up to 3 years or fine up to Rs. 2 lakh or both', 'both', 'cognizable',
'privacy violation, intimate images, voyeurism, non-consensual, cyber crime'),

((SELECT id FROM acts WHERE act_code = 'ITA2000'), 'XI', 'Offences', '66F',
'Punishment for cyber terrorism',
'Whoever with intent to threaten the unity, integrity, security or sovereignty of India or to strike terror in the people commits cyber terrorism shall be punishable with imprisonment which may extend to imprisonment for life.',
'Imprisonment for life', 'imprisonment', 'cognizable',
'cyber terrorism, national security, critical infrastructure, terror, sabotage'),

((SELECT id FROM acts WHERE act_code = 'ITA2000'), 'XI', 'Offences', '67',
'Punishment for publishing or transmitting obscene material in electronic form',
'Whoever publishes or transmits or causes to be published or transmitted any material which is lascivious or appeals to the prurient interest or its effect is such as to tend to deprave and corrupt persons shall be punished on first conviction with imprisonment up to three years and fine up to five lakh rupees and on subsequent conviction with imprisonment up to five years and fine up to ten lakh rupees.',
'First: 3 years + Rs. 5 lakh; Second: 5 years + Rs. 10 lakh', 'both', 'cognizable',
'obscene material, pornography, lascivious, electronic, publishing'),

((SELECT id FROM acts WHERE act_code = 'ITA2000'), 'XI', 'Offences', '67A',
'Punishment for publishing or transmitting of material containing sexually explicit act',
'Whoever publishes or transmits or causes to be published or transmitted any material containing sexually explicit act or conduct shall be punished on first conviction with imprisonment up to five years and fine up to ten lakh rupees and on subsequent conviction with imprisonment up to seven years and fine up to ten lakh rupees.',
'First: 5 years + Rs. 10 lakh; Second: 7 years + Rs. 10 lakh', 'both', 'cognizable',
'sexually explicit, adult content, pornography, electronic transmission'),

((SELECT id FROM acts WHERE act_code = 'ITA2000'), 'XI', 'Offences', '67B',
'Punishment for publishing or transmitting of material depicting children in sexually explicit act',
'Whoever publishes or transmits material depicting children in sexually explicit act or conduct, or creates text or digital images or advertises or promotes or facilitates abuse of children online, or records in any manner abuse of children, shall be punished on first conviction with imprisonment up to five years and fine up to ten lakh rupees and on subsequent conviction with imprisonment up to seven years and fine up to ten lakh rupees.',
'First: 5 years + Rs. 10 lakh; Second: 7 years + Rs. 10 lakh', 'both', 'cognizable',
'child pornography, CSAM, child abuse material, POCSO, child exploitation');

-- ============================================================
-- INSERT: SECTIONS - CONSTITUTION OF INDIA (Fundamental Rights)
-- ============================================================

INSERT INTO sections (act_id, chapter_number, chapter_title, section_number, title, content, punishment, punishment_type, offence_type, keywords) VALUES

((SELECT id FROM acts WHERE act_code = 'COI1950'), 'III', 'Fundamental Rights', '14',
'Equality before law',
'The State shall not deny to any person equality before the law or the equal protection of the laws within the territory of India.',
NULL, 'civil_remedy', 'civil',
'equality, equal protection, non-discrimination, fundamental right, Article 14'),

((SELECT id FROM acts WHERE act_code = 'COI1950'), 'III', 'Fundamental Rights', '19',
'Protection of certain rights regarding freedom of speech, etc.',
'(1) All citizens shall have the right— (a) to freedom of speech and expression; (b) to assemble peaceably and without arms; (c) to form associations or unions; (d) to move freely throughout the territory of India; (e) to reside and settle in any part of the territory of India; (g) to practise any profession, or to carry on any occupation, trade or business.',
NULL, 'civil_remedy', 'civil',
'freedom of speech, expression, assembly, association, movement, profession, Article 19'),

((SELECT id FROM acts WHERE act_code = 'COI1950'), 'III', 'Fundamental Rights', '21',
'Protection of life and personal liberty',
'No person shall be deprived of his life or personal liberty except according to procedure established by law.',
NULL, 'civil_remedy', 'civil',
'right to life, personal liberty, due process, fundamental right, Article 21'),

((SELECT id FROM acts WHERE act_code = 'COI1950'), 'III', 'Fundamental Rights', '21A',
'Right to education',
'The State shall provide free and compulsory education to all children of the age of six to fourteen years in such manner as the State may, by law, determine.',
NULL, 'civil_remedy', 'civil',
'right to education, free education, compulsory education, children, Article 21A'),

((SELECT id FROM acts WHERE act_code = 'COI1950'), 'III', 'Fundamental Rights', '32',
'Remedies for enforcement of rights conferred by this Part',
'The right to move the Supreme Court by appropriate proceedings for the enforcement of the rights conferred by this Part is guaranteed. The Supreme Court shall have power to issue directions or orders or writs for the enforcement of any of the rights conferred by this Part.',
NULL, 'civil_remedy', 'civil',
'writ petition, Supreme Court, habeas corpus, mandamus, certiorari, Article 32');

-- ============================================================
-- INSERT: SECTIONS - CONSUMER PROTECTION ACT
-- ============================================================

INSERT INTO sections (act_id, chapter_number, chapter_title, section_number, title, content, punishment, punishment_type, offence_type, keywords) VALUES

((SELECT id FROM acts WHERE act_code = 'CPA2019'), 'I', 'Preliminary', '2',
'Definitions',
'In this Act, unless the context otherwise requires— "consumer" means any person who buys any goods for a consideration or hires or avails of any service; "defect" means any fault, imperfection or shortcoming in the quality, quantity, potency, purity or standard; "deficiency" means any fault, imperfection, shortcoming or inadequacy in the quality, nature and manner of performance; "unfair trade practice" means a trade practice which adopts unfair method or deceptive practice.',
NULL, 'civil_remedy', 'civil',
'consumer definition, goods, services, defect, deficiency, unfair trade practice'),

((SELECT id FROM acts WHERE act_code = 'CPA2019'), 'III', 'Consumer Disputes Redressal Commission', '34',
'Jurisdiction of District Commission',
'Subject to the other provisions of this Act, the District Commission shall have jurisdiction to entertain complaints where the value of the goods or services paid as consideration does not exceed one crore rupees.',
NULL, 'civil_remedy', 'civil',
'district commission, jurisdiction, consumer forum, complaint, one crore'),

((SELECT id FROM acts WHERE act_code = 'CPA2019'), 'III', 'Consumer Disputes Redressal Commission', '47',
'Jurisdiction of State Commission',
'Subject to the other provisions of this Act, the State Commission shall have jurisdiction to entertain complaints where the value of the goods or services paid as consideration exceeds one crore rupees but does not exceed ten crore rupees.',
NULL, 'civil_remedy', 'civil',
'state commission, jurisdiction, consumer forum, complaint, ten crore'),

((SELECT id FROM acts WHERE act_code = 'CPA2019'), 'III', 'Consumer Disputes Redressal Commission', '58',
'Jurisdiction of National Commission',
'Subject to the other provisions of this Act, the National Commission shall have jurisdiction to entertain complaints where the value of the goods or services paid as consideration exceeds ten crore rupees.',
NULL, 'civil_remedy', 'civil',
'national commission, jurisdiction, NCDRC, complaint, consumer court');

-- ============================================================
-- INSERT: SECTIONS - HINDU MARRIAGE ACT
-- ============================================================

INSERT INTO sections (act_id, chapter_number, chapter_title, section_number, title, content, punishment, punishment_type, offence_type, keywords) VALUES

((SELECT id FROM acts WHERE act_code = 'HMA1955'), 'II', 'Hindu Marriages', '5',
'Conditions for a Hindu marriage',
'A marriage may be solemnized between any two Hindus, if the following conditions are fulfilled: (i) neither party has a spouse living at the time of the marriage; (ii) neither party is incapable of giving a valid consent; (iii) the bridegroom has completed the age of twenty-one years and the bride has completed the age of eighteen years; (iv) the parties are not within the degrees of prohibited relationship; (v) the parties are not sapindas of each other.',
NULL, 'none', 'civil',
'marriage conditions, Hindu marriage, age, consent, prohibited relationship, sapinda'),

((SELECT id FROM acts WHERE act_code = 'HMA1955'), 'IV', 'Restitution of Conjugal Rights and Judicial Separation', '9',
'Restitution of conjugal rights',
'When either the husband or the wife has, without reasonable excuse, withdrawn from the society of the other, the aggrieved party may apply, by petition to the district court, for restitution of conjugal rights and the court, on being satisfied of the truth of the statements made in such petition and that there is no legal ground why the application should not be granted, may decree restitution of conjugal rights accordingly.',
NULL, 'civil_remedy', 'civil',
'conjugal rights, restitution, separation, withdrawal, district court'),

((SELECT id FROM acts WHERE act_code = 'HMA1955'), 'V', 'Nullity of Marriage and Divorce', '13',
'Divorce',
'Any marriage solemnized may be dissolved by a decree of divorce on grounds including: adultery, cruelty, desertion for two years, conversion to another religion, unsoundness of mind, virulent leprosy, venereal disease, renunciation of world, presumption of death. Additional grounds for wife: husband guilty of rape, sodomy or bestiality; or decree of maintenance under Section 125 CrPC.',
NULL, 'civil_remedy', 'civil',
'divorce, grounds for divorce, adultery, cruelty, desertion, dissolution'),

((SELECT id FROM acts WHERE act_code = 'HMA1955'), 'V', 'Nullity of Marriage and Divorce', '13B',
'Divorce by mutual consent',
'Subject to the provisions of this Act a petition for dissolution of marriage by a decree of divorce may be presented to the district court by both the parties to a marriage together on the ground that they have been living separately for a period of one year or more, that they have not been able to live together and that they have mutually agreed that the marriage should be dissolved.',
NULL, 'civil_remedy', 'civil',
'mutual consent divorce, separation, joint petition, dissolution, amicable'),

((SELECT id FROM acts WHERE act_code = 'HMA1955'), 'VI', 'Maintenance and Alimony', '24',
'Maintenance pendente lite and expenses of proceedings',
'Where in any proceeding under this Act it appears to the court that either the wife or the husband has no independent income sufficient for her or his support and the necessary expenses of the proceeding, it may order the respondent to pay to the petitioner the expenses of the proceeding, and monthly during the proceeding such sum as having regard to the petitioner''s own income and the income of the respondent, it may seem to the court to be reasonable.',
NULL, 'civil_remedy', 'civil',
'maintenance, alimony, interim maintenance, pendente lite, expenses');

-- ============================================================
-- INSERT: SECTIONS - COMPANIES ACT
-- ============================================================

INSERT INTO sections (act_id, chapter_number, chapter_title, section_number, title, content, punishment, punishment_type, offence_type, keywords) VALUES

((SELECT id FROM acts WHERE act_code = 'CA2013'), 'II', 'Incorporation of Company and Matters Incidental Thereto', '3',
'Formation of company',
'A company may be formed for any lawful purpose by— (a) seven or more persons, in the case of a public company; (b) two or more persons, in the case of a private company; (c) one person, in the case of One Person Company— by subscribing their names or his name to a memorandum and complying with the requirements of this Act in respect of registration.',
NULL, 'none', 'civil',
'company formation, incorporation, public company, private company, OPC, memorandum'),

((SELECT id FROM acts WHERE act_code = 'CA2013'), 'VII', 'Management and Administration', '149',
'Company to have Board of Directors',
'Every company shall have a Board of Directors consisting of individuals as directors and shall have— (a) a minimum number of three directors in the case of a public company, two directors in the case of a private company, and one director in the case of a One Person Company; (b) a maximum of fifteen directors.',
NULL, 'none', 'civil',
'board of directors, directors, management, public company, private company'),

((SELECT id FROM acts WHERE act_code = 'CA2013'), 'XI', 'Appointment and Qualifications of Directors', '164',
'Disqualifications for appointment of director',
'A person shall not be eligible for appointment as a director of a company if: he is of unsound mind; he is an undischarged insolvent; he has applied to be adjudicated as an insolvent; he has been convicted of an offence involving moral turpitude; an order disqualifying him has been passed by a court or Tribunal.',
NULL, 'none', 'civil',
'director disqualification, insolvent, conviction, moral turpitude, eligibility'),

((SELECT id FROM acts WHERE act_code = 'CA2013'), 'XXVII', 'National Company Law Tribunal and Appellate Tribunal', '447',
'Punishment for fraud',
'Without prejudice to any liability including repayment of any debt, any person who is found to be guilty of fraud shall be punishable with imprisonment for a term which shall not be less than six months but which may extend to ten years and shall also be liable to fine which shall not be less than the amount involved in the fraud, but which may extend to three times the amount involved in the fraud.',
'Imprisonment 6 months to 10 years, fine equal to fraud amount up to 3x', 'both', 'cognizable',
'corporate fraud, punishment, imprisonment, fine, fraud');

-- ============================================================
-- INSERT: SECTIONS - TRANSFER OF PROPERTY ACT
-- ============================================================

INSERT INTO sections (act_id, chapter_number, chapter_title, section_number, title, content, punishment, punishment_type, offence_type, keywords) VALUES

((SELECT id FROM acts WHERE act_code = 'TPA1882'), 'II', 'Of Transfers of Property by Act of Parties', '5',
'Transfer of property defined',
'"Transfer of property" means an act by which a living person conveys property, in present or in future, to one or more other living persons, or to himself and one or more other living persons. "Living person" includes a company or association or body of individuals, whether incorporated or not.',
NULL, 'civil_remedy', 'civil',
'transfer of property, conveyance, living person, sale, gift, mortgage'),

((SELECT id FROM acts WHERE act_code = 'TPA1882'), 'III', 'Of Sales of Immoveable Property', '54',
'Sale defined',
'"Sale" is a transfer of ownership in exchange for a price paid or promised or part-paid and part-promised. A contract for the sale of immoveable property is a contract that a sale of such property shall take place on terms settled between the parties. It does not, of itself, create any interest in or charge on such property.',
NULL, 'civil_remedy', 'civil',
'sale, immovable property, ownership transfer, price, contract'),

((SELECT id FROM acts WHERE act_code = 'TPA1882'), 'IV', 'Of Mortgages of Immoveable Property', '58',
'Mortgage, mortgagor, mortgagee defined',
'A mortgage is the transfer of an interest in specific immoveable property for the purpose of securing the payment of money advanced or to be advanced by way of loan, an existing or future debt, or the performance of an engagement which may give rise to a pecuniary liability.',
NULL, 'civil_remedy', 'civil',
'mortgage, mortgagor, mortgagee, loan security, immovable property, debt'),

((SELECT id FROM acts WHERE act_code = 'TPA1882'), 'V', 'Of Leases of Immoveable Property', '105',
'Lease defined',
'A lease of immoveable property is a transfer of a right to enjoy such property, made for a certain time, express or implied, or in perpetuity, in consideration of a price paid or promised, or of money, a share of crops, service or any other thing of value, to be rendered periodically or on specified occasions to the transferor by the transferee, who accepts the transfer on such terms.',
NULL, 'civil_remedy', 'civil',
'lease, rent, tenancy, landlord, tenant, immovable property'),

((SELECT id FROM acts WHERE act_code = 'TPA1882'), 'VII', 'Of Gifts', '122',
'Gift defined',
'"Gift" is the transfer of certain existing moveable or immoveable property made voluntarily and without consideration, by one person, called the donor, to another, called the donee, and accepted by or on behalf of the donee.',
NULL, 'civil_remedy', 'civil',
'gift, donation, donor, donee, voluntary transfer, without consideration');

-- ============================================================
-- INSERT: SECTIONS - INCOME TAX ACT
-- ============================================================

INSERT INTO sections (act_id, chapter_number, chapter_title, section_number, title, content, punishment, punishment_type, offence_type, keywords) VALUES

((SELECT id FROM acts WHERE act_code = 'ITA1961'), 'II', 'Basis of Charge', '4',
'Charge of income-tax',
'Where any Central Act enacts that income-tax shall be charged for any assessment year at any rate or rates, income-tax at that rate or those rates shall be charged for that year in accordance with, and subject to the provisions of, this Act in respect of the total income of the previous year of every person.',
NULL, 'regulatory', 'civil',
'income tax charge, assessment year, previous year, total income, tax liability'),

((SELECT id FROM acts WHERE act_code = 'ITA1961'), 'IV', 'Computation of Total Income', '10',
'Incomes not included in total income',
'In computing the total income of a previous year of any person, any income falling within any of the following clauses shall not be included— agricultural income, receipts by members of HUF, share of partner from firm, allowances to MPs/MLAs, income of certain funds and institutions, etc.',
NULL, 'none', 'civil',
'exemption, tax free income, agricultural income, HUF, exempted income'),

((SELECT id FROM acts WHERE act_code = 'ITA1961'), 'VI-A', 'Deductions from Gross Total Income', '80C',
'Deduction in respect of life insurance premia, deferred annuity, etc.',
'In computing the total income of an assessee, there shall be deducted, in accordance with and subject to the provisions of this section, the whole of the amount paid or deposited in the previous year in the form of life insurance premium, contributions to provident fund, tuition fees, principal repayment of housing loan, etc., subject to a maximum of Rs. 1,50,000.',
NULL, 'none', 'civil',
'80C deduction, tax saving, LIC premium, PPF, ELSS, housing loan, deduction'),

((SELECT id FROM acts WHERE act_code = 'ITA1961'), 'XIV', 'Procedure for Assessment', '139',
'Return of income',
'Every person, being a company or a firm, shall furnish a return of income. Every person other than a company or a firm, if his total income during the previous year exceeded the maximum amount not chargeable to tax, shall furnish a return of income.',
NULL, 'none', 'civil',
'income tax return, ITR, filing, assessment, due date, return of income'),

((SELECT id FROM acts WHERE act_code = 'ITA1961'), 'XXII', 'Offences and Prosecutions', '276C',
'Punishment for willful attempt to evade tax',
'If a person willfully attempts in any manner whatsoever to evade any tax, penalty or interest chargeable or imposable under this Act, he shall be punishable with rigorous imprisonment for a term which shall not be less than six months but which may extend to seven years and with fine.',
'RI 6 months to 7 years and fine', 'both', 'cognizable',
'tax evasion, willful default, prosecution, punishment, criminal');

-- ============================================================
-- INSERT: SECTIONS - ENVIRONMENT PROTECTION ACT
-- ============================================================

INSERT INTO sections (act_id, chapter_number, chapter_title, section_number, title, content, punishment, punishment_type, offence_type, keywords) VALUES

((SELECT id FROM acts WHERE act_code = 'EPA1986'), 'III', 'Prevention, Control and Abatement of Environmental Pollution', '7',
'Persons carrying on industry, operation, etc., not to allow emission or discharge of environmental pollutants in excess of the standards',
'No person carrying on any industry, operation or process shall discharge or emit or permit to be discharged or emitted any environmental pollutant in excess of such standards as may be prescribed.',
NULL, 'regulatory', 'civil',
'pollution control, emission standards, discharge, environmental pollutant'),

((SELECT id FROM acts WHERE act_code = 'EPA1986'), 'IV', 'Penalties', '15',
'Penalty for contravention of the provisions of the Act',
'Whoever fails to comply with or contravenes any of the provisions of this Act, or the rules made or orders or directions issued thereunder, shall be punishable with imprisonment for a term which may extend to five years or with fine which may extend to one lakh rupees, or with both. If failure continues, additional fine up to five thousand rupees per day.',
'Imprisonment up to 5 years, or fine up to Rs. 1 lakh, or both', 'both', 'cognizable',
'environmental violation, penalty, imprisonment, fine, pollution'),

((SELECT id FROM acts WHERE act_code = 'EPA1986'), 'IV', 'Penalties', '16',
'Offences by companies',
'Where any offence under this Act has been committed by a company, every person who was directly in charge of and responsible to the company for the conduct of business shall be deemed guilty unless he proves lack of knowledge or due diligence.',
'Same as section 15', 'both', 'cognizable',
'corporate liability, company offence, vicarious liability, director');

-- ============================================================
-- INSERT: SECTIONS - INDUSTRIAL DISPUTES ACT
-- ============================================================

INSERT INTO sections (act_id, chapter_number, chapter_title, section_number, title, content, punishment, punishment_type, offence_type, keywords) VALUES

((SELECT id FROM acts WHERE act_code = 'IDA1947'), 'II-A', 'Notice of Change', '9A',
'Notice of change',
'No employer, who proposes to effect any change in the conditions of service applicable to any workman in respect of any matter specified in the Fourth Schedule, shall effect such change— (a) without giving to the workmen likely to be affected by such change a notice in the prescribed manner; (b) within twenty-one days of giving such notice.',
NULL, 'regulatory', 'civil',
'change in conditions, notice period, service conditions, workman, Fourth Schedule'),

((SELECT id FROM acts WHERE act_code = 'IDA1947'), 'V-A', 'Lay-off and Retrenchment', '25F',
'Conditions precedent to retrenchment of workmen',
'No workman employed for not less than one year shall be retrenched by the employer until: (a) the workman has been given one month''s notice in writing or wages in lieu thereof; (b) the workman has been paid retrenchment compensation equal to fifteen days'' average pay for every completed year of continuous service.',
NULL, 'civil_remedy', 'civil',
'retrenchment, notice, compensation, termination, workman, continuous service'),

((SELECT id FROM acts WHERE act_code = 'IDA1947'), 'V-B', 'Special Provisions Relating to Lay-off, Retrenchment and Closure', '25N',
'Conditions precedent to retrenchment in establishments with 100+ workers',
'No workman employed in any industrial establishment to which this Chapter applies shall be retrenched by the employer until— (a) three months'' notice has been given to the appropriate Government; (b) prior permission has been obtained from Government.',
NULL, 'civil_remedy', 'civil',
'retrenchment permission, government approval, 100 workers, Chapter VB');

-- ============================================================
-- INSERT: SECTIONS - SARFAESI ACT
-- ============================================================

INSERT INTO sections (act_id, chapter_number, chapter_title, section_number, title, content, punishment, punishment_type, offence_type, keywords) VALUES

((SELECT id FROM acts WHERE act_code = 'SARFAESI2002'), 'III', 'Enforcement of Security Interest', '13',
'Enforcement of security interest',
'Notwithstanding anything contained in Section 69 or Section 69A of the Transfer of Property Act, 1882, any security interest created in favour of any secured creditor may be enforced, without the intervention of court or tribunal, by such creditor. Where any borrower makes any default in repayment of secured debt, the secured creditor may require the borrower to discharge in full his liabilities within sixty days from the date of notice.',
NULL, 'none', 'civil',
'NPA recovery, security enforcement, 60 days notice, secured creditor, bank recovery'),

((SELECT id FROM acts WHERE act_code = 'SARFAESI2002'), 'III', 'Enforcement of Security Interest', '14',
'Chief Metropolitan Magistrate or District Magistrate to assist secured creditor',
'Where the possession of any secured asset is required to be taken by the secured creditor, and the secured creditor is not able to take possession, the secured creditor may request in writing to the Chief Metropolitan Magistrate or the District Magistrate within whose jurisdiction any such secured asset or other documents relating thereto is situated or found, to take possession of such asset.',
NULL, 'none', 'civil',
'possession, secured asset, DM assistance, CMM, physical possession, SARFAESI'),

((SELECT id FROM acts WHERE act_code = 'SARFAESI2002'), 'IV', 'Debts Recovery Tribunal', '17',
'Application against measures to recover secured debts',
'Any person, including the borrower, aggrieved by any of the measures taken by the secured creditor or his authorised officer under this Chapter may make an application along with fee to the Debts Recovery Tribunal to set aside the action.',
NULL, 'civil_remedy', 'civil',
'DRT appeal, borrower remedy, SARFAESI challenge, set aside, Debts Recovery Tribunal');

-- ============================================================
-- INSERT: SECTIONS - RERA
-- ============================================================

INSERT INTO sections (act_id, chapter_number, chapter_title, section_number, title, content, punishment, punishment_type, offence_type, keywords) VALUES

((SELECT id FROM acts WHERE act_code = 'RERA2016'), 'II', 'Registration of Real Estate Project and Registration of Real Estate Agents', '3',
'Prior registration of real estate project with Real Estate Regulatory Authority',
'No promoter shall advertise, market, book, sell or offer for sale, or invite persons to purchase in any manner any plot, apartment or building, in any real estate project, in any planning area, without registering the real estate project with the Real Estate Regulatory Authority.',
'Imprisonment up to 3 years, or fine up to 10% of estimated project cost, or both', 'both', 'regulatory',
'RERA registration, real estate project, promoter, advertisement, booking'),

((SELECT id FROM acts WHERE act_code = 'RERA2016'), 'IV', 'Functions and Duties of Promoter', '18',
'Return of amount and compensation',
'If the promoter fails to complete or is unable to give possession of an apartment, plot or building in accordance with the terms of agreement or due to discontinuance of his business on account of suspension or revocation of registration, the promoter shall be liable to return the amount received with interest and compensation.',
NULL, 'civil_remedy', 'civil',
'refund, possession delay, compensation, builder default, homebuyer remedy'),

((SELECT id FROM acts WHERE act_code = 'RERA2016'), 'VIII', 'Offences, Penalties and Adjudication', '59',
'Punishment for non-registration of project',
'If any promoter contravenes the provisions of Section 3, he shall be liable to a penalty which may extend to ten per cent of the estimated cost of the real estate project. If he fails to comply with orders, he may face imprisonment up to three years or fine or both.',
'Penalty up to 10% of project cost; imprisonment up to 3 years on continued default', 'both', 'regulatory',
'RERA penalty, non-registration, promoter punishment, real estate violation');

-- ============================================================
-- INSERT: SECTIONS - INSOLVENCY AND BANKRUPTCY CODE
-- ============================================================

INSERT INTO sections (act_id, chapter_number, chapter_title, section_number, title, content, punishment, punishment_type, offence_type, keywords) VALUES

((SELECT id FROM acts WHERE act_code = 'IBC2016'), 'II', 'Corporate Insolvency Resolution Process', '7',
'Initiation of corporate insolvency resolution process by financial creditor',
'A financial creditor either by itself or jointly with other financial creditors may file an application for initiating corporate insolvency resolution process against a corporate debtor before the Adjudicating Authority when a default has occurred.',
NULL, 'civil_remedy', 'civil',
'CIRP initiation, financial creditor, default, NCLT, corporate debtor'),

((SELECT id FROM acts WHERE act_code = 'IBC2016'), 'II', 'Corporate Insolvency Resolution Process', '9',
'Initiation of corporate insolvency resolution process by operational creditor',
'After the expiry of the period of ten days from the date of delivery of the notice or invoice demanding payment, if the operational creditor does not receive payment or notice of dispute, the operational creditor may file an application before the Adjudicating Authority for initiating a corporate insolvency resolution process.',
NULL, 'civil_remedy', 'civil',
'operational creditor, CIRP, demand notice, ten days, unpaid dues'),

((SELECT id FROM acts WHERE act_code = 'IBC2016'), 'II', 'Corporate Insolvency Resolution Process', '12',
'Time-limit for completion of insolvency resolution process',
'The corporate insolvency resolution process shall be completed within a period of one hundred and eighty days from the date of admission of the application to initiate such process. The Adjudicating Authority may extend the period by ninety days if instructed by seventy-five per cent of the voting share of the committee of creditors.',
NULL, 'civil_remedy', 'civil',
'CIRP timeline, 180 days, extension, 90 days, CoC voting, resolution process'),

((SELECT id FROM acts WHERE act_code = 'IBC2016'), 'II', 'Corporate Insolvency Resolution Process', '29A',
'Persons not eligible to be resolution applicant',
'A person shall not be eligible to submit a resolution plan if such person is an undischarged insolvent, is a wilful defaulter, has been convicted of an offence punishable with imprisonment of two years or more, has been disqualified as a director, is promoter of corporate debtor with NPA for one year or more, has been debarred from accessing capital markets by SEBI.',
NULL, 'civil_remedy', 'civil',
'ineligibility, resolution applicant, wilful defaulter, disqualification, 29A');

-- Create admin user for system (nytrixaiindia@gmail.com / teamjkm)
INSERT INTO users (email, password_hash, full_name, role, is_verified, is_active, api_key) VALUES
('nytrixaiindia@gmail.com', '$2b$10$teamjkm_hashed_password_secure', 'Nytrix AI India Admin', 'admin', TRUE, TRUE, 'nytrix_api_key_admin_2026_secure');
