const INTELLIGENCE_GATHERING_QUESTIONNAIRE = {
    portalQueries: {
        name: 'Portal Queries (Was Derogatory Information Identified? Yes/No)',
        questions: [{
            question: 'Portal Milestones',
            formControlName: 'portalMilestonesIndicator',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }, {
            question: 'Portal Company History',
            formControlName: 'portalMilestonesIndicator',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }, {
            question: 'Portal Document Exchange',
            formControlName: 'portalDocumentExchangeIndicator',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }, {
            question: 'Portal Company Name(s)/DBAs Search – Include Withdrawn Accounts in Search',
            formControlName: 'portalCompanyNameIndicator',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }, {
            question: 'Portal BEI Search',
            formControlName: 'portalBeiSearchIndicator',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }, {
            question: 'POC Portal User ID Email checked in Admin. Portal',
            formControlName: 'portalUserIdIndicator',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }],
        freetextquestion: {
            show: true,
            formControlName: 'portalQueryResponse'
        }
    },
    openSourceQueries: {
        name: 'Open Source (OS) Queries (Was Derogatory Information Identified? Yes/No)',
        questions: [{
            question: 'OS Company Name(s)',
            formControlName: 'opensourceCompanyName',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }, {
            question: 'OS Website (cached)',
            formControlName: 'opensourceWebsite',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }, {
            question: 'OS Company Name(s) News',
            formControlName: 'opensourceCompanyNameNews',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }, {
            question: 'OS Phone Number(s)',
            formControlName: 'opensourcePhone',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }, {
            question: 'OS Company DBA',
            formControlName: 'opensourceDBA',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }, {
            question: 'OS Company   Address(s)',
            formControlName: 'opensourceAddress',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }],
        freetextquestion: {
            show: true,
            formControlName: 'opensourceQueryResponse'
        }
    },
    bondQueries: {
        name: 'Bond Query',
        questions: [{
            question: 'Bond (Bond Number)',
            formControlName: 'bondIndicator',
            allowedBusinessTypes: ['Air Carrier']
        }],
        freetextquestion: {
            show: true,
            formControlName: 'bondQueryResponse'
        }
    },
    fmcBondQueries: {
        name: 'FMC and Bond Query',
        questions: [{
            question: 'NVOCC (Companynames(s) or license)',
            formControlName: 'fmcBondCompanyName',
            allowedBusinessTypes: ['Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)']
        }, {
            question: 'Bond (Bond Number)',
            formControlName: 'fmcBondNumber',
            allowedBusinessTypes: ['Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)']
        }],
        freetextquestion: {
            show: true,
            formControlName: 'fmcBondQueryResponse'
        }
    },
    atsExportQueries: {
        name: 'ATS Export Queries',
        questions: [{
            question: 'EIN No. (Go to Export Cargo – Trade Entity)',
            formControlName: 'atsEinNumber',
            allowedBusinessTypes: ['Exporter']
        }, {
            question: 'ATS-AT number of Export records:',
            formControlName: 'atsExportRecords',
            allowedBusinessTypes: ['Exporter']
        }, {
            question: 'DUNS No.',
            formControlName: 'atsDunsNo',
            allowedBusinessTypes: ['Exporter']
        }, {
            question: 'ATS-AT Search Range',
            formControlName: 'atsSearchRange',
            allowedBusinessTypes: ['Exporter']
        }],
        freetextquestion: {
            show: true,
            formControlName: 'atsQueryResponse'
        }
    },
    midQueries: {
        name: 'MID Queries',
        questions: [{
            question: 'MID Number Query',
            formControlName: 'midQueryNumber',
            allowedBusinessTypes: ['Foreign Manufacturer']
        }, {
            question: 'MID Company Name(s)',
            formControlName: 'midQueryCompanyName',
            allowedBusinessTypes: ['Foreign Manufacturer']
        }],
        freetextquestion: {
            show: true,
            formControlName: 'midQueryResponse'
        }
    },
    dotQueries: {
        name: 'DOT Queries',
        questions: [{
            question: 'DOT (Company Name)',
            formControlName: 'dotQueryCompanyName',
            allowedBusinessTypes: ['Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico']
        }, {
            question: 'DOT (USDOT number)',
            formControlName: 'dotQueryNumber',
            allowedBusinessTypes: ['Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico']
        }],
        freetextquestion: {
            show: true,
            formControlName: 'dotQueryResponse'
        }
    },
    satQueries: {
        name: 'SAT Queries',
        questions: [{
            question: 'RFC (Registro Federal Contribuyante)',
            formControlName: 'satRfc',
            allowedBusinessTypes: ['Mexican Long Haul Highway Carrier']
        }],
        freetextquestion: {
            show: true,
            formControlName: 'satQueryResponse'
        }
    },
    fmcQueries: {
        name: 'FMC Queries',
        questions: [{
            question: '6-digit FMC/MTO number',
            formControlName: 'fmcNumber',
            allowedBusinessTypes: ['U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator']
        }],
        freetextquestion: {
            show: true,
            formControlName: 'fmcQueryResponse'
        }
    },
    bondScacQueries: {
        name: 'Bond And SCAC Queries',
        questions: [{
            question: 'SCAC Code',
            formControlName: 'bondScacCode',
            allowedBusinessTypes: ['Rail Carrier']
        }, {
            question: 'Bond (Bond Number)',
            formControlName: 'bondScacNumber',
            allowedBusinessTypes: ['Rail Carrier']
        }],
        freetextquestion: {
            show: true,
            formControlName: 'bondScacQueryResponse'
        }
    },
    bondFmcQuery: {
        name: 'Bond And FMC Query',
        questions: [{
            question: 'Bond (Bond Number)',
            formControlName: 'bondFmcNumber',
            allowedBusinessTypes: ['Sea Carrier']
        }, {
            question: '6-digit FMC/MTO number',
            formControlName: 'bondFmcMtoNumber',
            allowedBusinessTypes: ['Sea Carrier']
        }],
        freetextquestion: {
            show: true,
            formControlName: 'bondFmcQueryResponse'
        }
    },
    lexisQueries: {
        name: 'Lexis Nexis Accurint Queries (Was Derogatory Information Identified? Yes/No)',
        questions: [{
            question: 'US Company Name(s)',
            formControlName: 'lexisCompanyName',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }, {
            question: 'Company Owner(s) & POC Names',
            formControlName: 'lexisCompanyOwner',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }, {
            question: 'US Address',
            formControlName: 'lexisAddress',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }, {
            question: 'US Phone Number',
            formControlName: 'lexisPhone',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }],
        freetextquestion: {
            show: true,
            formControlName: 'lexisQueryResponse'
        }
    },
    analyticalQueries: {
        name: 'Analytical Framework For Intelligence (AFI) (Was Derogatory Information Identified? Yes/No)',
        questions: [{
            question: 'Business Entity Identifier(s)',
            formControlName: 'analyticalBusinessIdentifier',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }, {
            question: 'Company Phone Number(s)',
            formControlName: 'analyticalPhone',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }, {
            question: 'Owner(s) & POC Name(s)',
            formControlName: 'analyticalOwner',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }, {
            question: 'Company Name(s)',
            formControlName: 'analyticalCompanyName',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }, {
            question: 'Owner(s) & POC Email(s)',
            formControlName: 'analyticalOwnerEmail',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }, {
            question: 'Company Address',
            formControlName: 'analyticalCompanyAddress',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }, {
            question: 'Owner(s) & POC Phone(s)',
            formControlName: 'analyticalOwnerPhone',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }],
        freetextquestion: {
            show: true,
            formControlName: 'analyticalQueryResponse'
        }
    },
    atsBeiQuery: {
        name: 'ATS BEI Query',
        questions: [{
            question: 'ATS-Advance Search',
            formControlName: 'atsBeiAdvanceSearch',
            allowedBusinessTypes: ['Importer', 'Licensed U.S. Customs Broker', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Rail Carrier', 'Sea Carrier']
        }, {
            question: 'ATS- number of import records:',
            formControlName: 'atsBeiImportRecords',
            allowedBusinessTypes: ['Importer', 'Licensed U.S. Customs Broker', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Rail Carrier', 'Sea Carrier']
        }, {
            question: 'ATS- Search Range',
            formControlName: 'atsBeiSearchRange',
            allowedBusinessTypes: ['Importer', 'Licensed U.S. Customs Broker', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Rail Carrier', 'Sea Carrier']
        }],
        freetextquestion: {
            show: true,
            formControlName: 'atsBeiQueryResponse'
        }
    },
    irsQuery: {
        name: 'IRS-NG Standalone Super Query (Was Derogatory Information Identified? Yes/No)',
        questions: [{
            question: 'Super Query Business Name(s)',
            formControlName: 'irsBusinessName',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }, {
            question: 'Criminal History Results',
            formControlName: 'irsCriminalHistoryResults',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }, {
            question: 'Super Query Address(s)',
            formControlName: 'irsQueryAddress',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }, {
            question: 'Global Enrollment System Results',
            formControlName: 'irsEnrollmentResults',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }, {
            question: 'Super Query Owner(s) & POC(s)',
            formControlName: 'irsQueryOwner',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }],
        freetextquestion: {
            show: true,
            formControlName: 'irsQueryResponse'
        }
    },
    diceQuery: {
        name: 'DICE (Required for All New Applicants, Optional for Annual Vetting) (Was Derogatory Information Identified? Yes/No)',
        questions: [{
            question: 'DICE Query',
            formControlName: 'diceQuery',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }],
        freetextquestion: {
            show: true,
            formControlName: 'diceQueryResponse'
        }
    }
   /*  additionalQuery: {
        name: 'ADDITIONAL VETTING IF NEEDED OR REQUIRED BY SUBJECT MATTER EXPERT(SME)',
        questions: [{
            question: 'Queries Run',
            formControlName: 'additionalQueryRun',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }, {
            question: 'Derogatory Results',
            formControlName: 'additionalDerogatoryResults',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }, {
            question: 'Name of SME who Conducted Query',
            formControlName: 'additionalSmeName',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }],
        freetextquestion: {
            show: false
        }
    } */



};

export function getQuestionsByBusinessFunction(businessFunction: string) {
    const questionnaire: any[] = [];
    Object.entries(INTELLIGENCE_GATHERING_QUESTIONNAIRE).forEach(([key, value]) => {
         const filteredquestions = filterQuestionsByBusinessFunction(value, businessFunction);
        if (filteredquestions.length > 0) {
            questionnaire.push({ ...value, questions: filteredquestions });
        }
    });
    return questionnaire;
}

function filterQuestionsByBusinessFunction(value: any, businessFunction: string): any[] {
    return value.questions.filter((que: any) => que.allowedBusinessTypes.includes(businessFunction));
}