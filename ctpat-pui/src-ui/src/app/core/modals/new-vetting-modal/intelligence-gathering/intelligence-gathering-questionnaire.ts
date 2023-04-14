const INTELLIGENCE_GATHERING_QUESTIONNAIRE = {
    portalQueries: {
        name: 'Portal Queries (Was Derogatory Information Identified? Yes/No)',
        questions: [{
            question: 'Portal Milestones',
            formControlName: 'portalMilestones',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }, {
            question: 'Portal Company History',
            formControlName: 'portalCompanyHist',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }, {
            question: 'Portal Document Exchange',
            formControlName: 'portalDocExchange',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }, {
            question: 'Portal Company Name(s)/DBAs Search – Include Withdrawn Accounts in Search',
            formControlName: 'portalCompanySearch',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }, {
            question: 'Portal BEI Search',
            formControlName: 'portalBeiSearch',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }, {
            question: 'POC Portal User ID Email checked in Admin. Portal',
            formControlName: 'portalPocCheck',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }],
        freetextquestion: {
            show: true,
            formControlName: 'portalAdditionalText'
        }
    },
    openSourceQueries: {
        name: 'Open Source (OS) Queries (Was Derogatory Information Identified? Yes/No)',
        questions: [{
            question: 'OS Company Name(s)',
            formControlName: 'osCompanyName',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }, {
            question: 'OS Website (cached)',
            formControlName: 'osWebsite',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }, {
            question: 'OS Company Name(s) News',
            formControlName: 'osCompanyNews',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }, {
            question: 'OS Phone Number(s)',
            formControlName: 'osPhone',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }, {
            question: 'OS Company DBA',
            formControlName: 'osCompanyDba',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }, {
            question: 'OS Company   Address(s)',
            formControlName: 'osCompanyAddress',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }],
        freetextquestion: {
            show: true,
            formControlName: 'osAdditionalText'
        }
    },
    bondQueries: {
        name: 'Bond Query',
        questions: [{
            question: 'Bond (Bond Number)',
            formControlName: 'bqBond',
            allowedBusinessTypes: ['Air Carrier']
        }],
        freetextquestion: {
            show: true,
            formControlName: 'bqAdditionalText'
        }
    },
    fmcBondQueries: {
        name: 'FMC and Bond Query',
        questions: [{
            question: 'NVOCC (Companynames(s) or license)',
            formControlName: 'fmcbqNvocc',
            allowedBusinessTypes: ['Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)']
        }, {
            question: 'Bond (Bond Number)',
            formControlName: 'fmcbqBond',
            allowedBusinessTypes: ['Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)']
        }],
        freetextquestion: {
            show: true,
            formControlName: 'fmcBondAdditionalText'
        }
    },
    atsExportQueries: {
        name: 'ATS Export Queries',
        questions: [{
            question: 'EIN No. (Go to Export Cargo – Trade Entity)',
            formControlName: 'atsExportEin',
            allowedBusinessTypes: ['Exporter']
        }, {
            question: 'ATS-AT number of Export records:',
            formControlName: 'atsExportNumber',
            allowedBusinessTypes: ['Exporter']
        }, {
            question: 'DUNS No.',
            formControlName: 'atsExportDuns',
            allowedBusinessTypes: ['Exporter']
        }, {
            question: 'ATS-AT Search Range',
            formControlName: 'atsExportSearchRange',
            allowedBusinessTypes: ['Exporter']
        }],
        freetextquestion: {
            show: true,
            formControlName: 'atsExportAdditionalText'
        }
    },
    midQueries: {
        name: 'MID Queries',
        questions: [{
            question: 'MID Number Query',
            formControlName: 'midNumQuery',
            allowedBusinessTypes: ['Foreign Manufacturer']
        }, {
            question: 'MID Company Name(s)',
            formControlName: 'midCompanyName',
            allowedBusinessTypes: ['Foreign Manufacturer']
        }],
        freetextquestion: {
            show: true,
            formControlName: 'midAdditionalText'
        }
    },
    dotQueries: {
        name: 'DOT Queries',
        questions: [{
            question: 'DOT (Company Name)',
            formControlName: 'dotCompanyName',
            allowedBusinessTypes: ['Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico']
        }, {
            question: 'DOT (USDOT number)',
            formControlName: 'dotUsdotNum',
            allowedBusinessTypes: ['Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico']
        }],
        freetextquestion: {
            show: true,
            formControlName: 'dotAdditionalText'
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
            formControlName: 'satAdditionalText'
        }
    },
    fmcQueries: {
        name: 'FMC Queries',
        questions: [{
            question: '6-digit FMC/MTO number',
            formControlName: 'fmcMtoNum',
            allowedBusinessTypes: ['U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator']
        }],
        freetextquestion: {
            show: true,
            formControlName: 'fmcAddtionalText'
        }
    },
    bondScacQueries: {
        name: 'Bond And SCAC Queries',
        questions: [{
            question: 'SCAC Code',
            formControlName: 'scacCode',
            allowedBusinessTypes: ['Rail Carrier']
        }, {
            question: 'Bond (Bond Number)',
            formControlName: 'bondscacQuery',
            allowedBusinessTypes: ['Rail Carrier']
        }],
        freetextquestion: {
            show: true,
            formControlName: 'bondscacAdditionalText'
        }
    },
    bondFmcQuery: {
        name: 'Bond And FMC Query',
        questions: [{
            question: 'Bond (Bond Number)',
            formControlName: 'bondFmcQuery',
            allowedBusinessTypes: ['Sea Carrier']
        }, {
            question: '6-digit FMC/MTO number',
            formControlName: 'bondFmcMtoNum',
            allowedBusinessTypes: ['Sea Carrier']
        }],
        freetextquestion: {
            show: true,
            formControlName: 'bondFmcAdditionalText'
        }
    },
    lexisQueries: {
        name: 'Lexis Nexis Accurint Queries (Was Derogatory Information Identified? Yes/No)',
        questions: [{
            question: 'US Company Name(s)',
            formControlName: 'lexisnexisCompanyName',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }, {
            question: 'Company Owner(s) & POC Names',
            formControlName: 'lexisnexisPocs',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }, {
            question: 'US Address',
            formControlName: 'lexisnexisUsAddress',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }, {
            question: 'US Phone Number',
            formControlName: 'lexisnexisPhone',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }],
        freetextquestion: {
            show: true,
            formControlName: 'lexisnexisAdditionalText'
        }
    },
    analyticalQueries: {
        name: 'Analytical Framework For Intelligence (AFI) (Was Derogatory Information Identified? Yes/No)',
        questions: [{
            question: 'Business Entity Identifier(s)',
            formControlName: 'afiBei',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }, {
            question: 'Company Phone Number(s)',
            formControlName: 'afiCompanyPhone',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }, {
            question: 'Owner(s) & POC Name(s)',
            formControlName: 'afiOwnerPocsName',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }, {
            question: 'Company Name(s)',
            formControlName: 'afiCompanyName',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }, {
            question: 'Owner(s) & POC Email(s)',
            formControlName: 'afiOwnerPocsEmail',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }, {
            question: 'Company Address',
            formControlName: 'afiCompanyAddress',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }, {
            question: 'Owner(s) & POC Phone(s)',
            formControlName: 'afiOwnerPocsPhone',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }],
        freetextquestion: {
            show: true,
            formControlName: 'afiAdditionalText'
        }
    },
    atsBeiQuery: {
        name: 'ATS BEI Query',
        questions: [{
            question: 'ATS-Advance Search',
            formControlName: 'atsBeiSearch',
            allowedBusinessTypes: ['Importer', 'Licensed U.S. Customs Broker', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Rail Carrier', 'Sea Carrier']
        }, {
            question: 'ATS- number of import records:',
            formControlName: 'atsBeiImports',
            allowedBusinessTypes: ['Importer', 'Licensed U.S. Customs Broker', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Rail Carrier', 'Sea Carrier']
        }, {
            question: 'ATS- Search Range',
            formControlName: 'atsBeiSearchRange',
            allowedBusinessTypes: ['Importer', 'Licensed U.S. Customs Broker', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Rail Carrier', 'Sea Carrier']
        }],
        freetextquestion: {
            show: true,
            atsBeiAdditionalText: 'atsBeiQueryResponse'
        }
    },
    irsQuery: {
        name: 'IRS-NG Standalone Super Query (Was Derogatory Information Identified? Yes/No)',
        questions: [{
            question: 'Super Query Business Name(s)',
            formControlName: 'irsNgBusinessName',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }, {
            question: 'Criminal History Results',
            formControlName: 'irsNgCriminalHist',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }, {
            question: 'Super Query Address(s)',
            formControlName: 'irsNgAddresses',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }, {
            question: 'Global Enrollment System Results',
            formControlName: 'irsNgGlobal',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }, {
            question: 'Super Query Owner(s) & POC(s)',
            formControlName: 'irsNgOwnerPocs',
            allowedBusinessTypes: ['Importer', 'Air Carrier', 'Consolidator', 'Consolidator, Air Freight Consolidators', 'Consolidator, Ocean Transportation Intermediaries', 'Consolidator, Non-Vessel Operating Common Carriers (NVOCC)', 'Licensed U.S. Customs Broker', 'Exporter', 'Foreign Manufacturer', 'Highway Carrier', 'Highway Carrier - U.S. / Canada', 'Highway Carrier - U.S. / Mexico', 'Mexican Long Haul Highway Carrier', 'U.S. Marine Port or Terminal Operator', 'Foreign Based Marine Port Terminal Operator', 'Rail Carrier', 'Sea Carrier', 'Third Party Logistics Provider']
        }],
        freetextquestion: {
            show: true,
            formControlName: 'irsNgAditionalText'
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
            formControlName: 'diceAddtionalText'
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