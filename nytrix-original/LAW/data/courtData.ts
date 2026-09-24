// Indian States, Districts, and Local Areas Data
export interface LocationData {
  states: {
    [key: string]: {
      name: string;
      districts: {
        [key: string]: {
          name: string;
          localAreas: string[];
        };
      };
    };
  };
}

export const indianLocations: LocationData = {
  states: {
    'delhi': {
      name: 'Delhi',
      districts: {
        'central-delhi': {
          name: 'Central Delhi',
          localAreas: ['Connaught Place', 'Paharganj', 'Karol Bagh', 'Rajender Nagar', 'Daryaganj', 'Chandni Chowk']
        },
        'north-delhi': {
          name: 'North Delhi',
          localAreas: ['Civil Lines', 'Model Town', 'Kamla Nagar', 'GTB Nagar', 'Burari', 'Timarpur']
        },
        'south-delhi': {
          name: 'South Delhi',
          localAreas: ['Saket', 'Hauz Khas', 'Greater Kailash', 'Lajpat Nagar', 'Defence Colony', 'Green Park', 'Kalkaji']
        },
        'east-delhi': {
          name: 'East Delhi',
          localAreas: ['Preet Vihar', 'Laxmi Nagar', 'Mayur Vihar', 'Patparganj', 'Pandav Nagar', 'Krishna Nagar']
        },
        'west-delhi': {
          name: 'West Delhi',
          localAreas: ['Rajouri Garden', 'Janakpuri', 'Dwarka', 'Punjabi Bagh', 'Tilak Nagar', 'Vikaspuri']
        },
        'new-delhi': {
          name: 'New Delhi',
          localAreas: ['India Gate', 'Chanakyapuri', 'Khan Market', 'Lodhi Colony', 'Jor Bagh', 'Golf Links']
        },
        'shahdara': {
          name: 'Shahdara',
          localAreas: ['Dilshad Garden', 'Vivek Vihar', 'Anand Vihar', 'Karkardooma', 'Seelampur', 'Jhilmil']
        }
      }
    },
    'maharashtra': {
      name: 'Maharashtra',
      districts: {
        'mumbai-city': {
          name: 'Mumbai City',
          localAreas: ['Colaba', 'Churchgate', 'Marine Lines', 'Grant Road', 'Mumbai Central', 'Tardeo', 'Worli']
        },
        'mumbai-suburban': {
          name: 'Mumbai Suburban',
          localAreas: ['Andheri', 'Bandra', 'Kurla', 'Borivali', 'Malad', 'Goregaon', 'Kandivali', 'Juhu']
        },
        'pune': {
          name: 'Pune',
          localAreas: ['Shivajinagar', 'Kothrud', 'Deccan', 'Camp', 'Hadapsar', 'Viman Nagar', 'Koregaon Park', 'Baner']
        },
        'nagpur': {
          name: 'Nagpur',
          localAreas: ['Dharampeth', 'Sadar', 'Civil Lines', 'Sitabuldi', 'Gandhibagh', 'Hingna', 'Manish Nagar']
        },
        'thane': {
          name: 'Thane',
          localAreas: ['Thane West', 'Thane East', 'Ghodbunder Road', 'Kalwa', 'Mumbra', 'Dombivli', 'Kalyan']
        },
        'nashik': {
          name: 'Nashik',
          localAreas: ['Panchavati', 'Gangapur Road', 'College Road', 'Nashik Road', 'Deolali', 'Satpur']
        },
        'aurangabad': {
          name: 'Aurangabad',
          localAreas: ['Cidco', 'Shahgunj', 'Begumpura', 'Cannought Place', 'Nirala Bazar', 'Waluj']
        }
      }
    },
    'karnataka': {
      name: 'Karnataka',
      districts: {
        'bengaluru-urban': {
          name: 'Bengaluru Urban',
          localAreas: ['Koramangala', 'Indiranagar', 'Whitefield', 'Jayanagar', 'Malleshwaram', 'HSR Layout', 'BTM Layout', 'Electronic City']
        },
        'bengaluru-rural': {
          name: 'Bengaluru Rural',
          localAreas: ['Anekal', 'Devanahalli', 'Doddaballapur', 'Hosakote', 'Nelamangala']
        },
        'mysuru': {
          name: 'Mysuru',
          localAreas: ['Vijayanagar', 'Kuvempunagar', 'Saraswathipuram', 'Gokulam', 'Nazarbad', 'Lakshmipuram']
        },
        'mangaluru': {
          name: 'Mangaluru',
          localAreas: ['Hampankatta', 'Kadri', 'Bejai', 'Kankanady', 'Surathkal', 'Panambur']
        },
        'hubli-dharwad': {
          name: 'Hubli-Dharwad',
          localAreas: ['Hubli', 'Dharwad', 'Keshwapur', 'Vidyanagar', 'Gokul Road', 'Navanagar']
        }
      }
    },
    'tamil-nadu': {
      name: 'Tamil Nadu',
      districts: {
        'chennai': {
          name: 'Chennai',
          localAreas: ['T. Nagar', 'Anna Nagar', 'Adyar', 'Velachery', 'Nungambakkam', 'Mylapore', 'Egmore', 'Guindy']
        },
        'coimbatore': {
          name: 'Coimbatore',
          localAreas: ['RS Puram', 'Gandhipuram', 'Saibaba Colony', 'Peelamedu', 'Race Course', 'Ukkadam']
        },
        'madurai': {
          name: 'Madurai',
          localAreas: ['Anna Nagar', 'KK Nagar', 'Tallakulam', 'Mattuthavani', 'Thirunagar', 'Goripalayam']
        },
        'tiruchirappalli': {
          name: 'Tiruchirappalli',
          localAreas: ['Cantonment', 'Srirangam', 'Thillai Nagar', 'Woraiyur', 'K.K. Nagar', 'Tennur']
        },
        'salem': {
          name: 'Salem',
          localAreas: ['Fairlands', 'Hasthampatti', 'Shevapet', 'Suramangalam', 'Junction', 'Ammapet']
        }
      }
    },
    'telangana': {
      name: 'Telangana',
      districts: {
        'hyderabad': {
          name: 'Hyderabad',
          localAreas: ['Banjara Hills', 'Jubilee Hills', 'Hitech City', 'Madhapur', 'Gachibowli', 'Somajiguda', 'Abids', 'Secunderabad']
        },
        'rangareddy': {
          name: 'Rangareddy',
          localAreas: ['LB Nagar', 'Mehdipatnam', 'Shamshabad', 'Rajendranagar', 'Kukatpally', 'Miyapur']
        },
        'medchal': {
          name: 'Medchal-Malkajgiri',
          localAreas: ['Kompally', 'Alwal', 'Uppal', 'Kapra', 'Malkajgiri', 'AS Rao Nagar']
        },
        'warangal': {
          name: 'Warangal',
          localAreas: ['Hanamkonda', 'Kazipet', 'Hunter Road', 'Subedari', 'Ramnagar', 'Warangal Fort']
        }
      }
    },
    'gujarat': {
      name: 'Gujarat',
      districts: {
        'ahmedabad': {
          name: 'Ahmedabad',
          localAreas: ['CG Road', 'SG Highway', 'Satellite', 'Navrangpura', 'Bodakdev', 'Maninagar', 'Paldi', 'Vastrapur']
        },
        'surat': {
          name: 'Surat',
          localAreas: ['Athwa', 'Adajan', 'Ring Road', 'City Light', 'Vesu', 'Piplod', 'Katargam']
        },
        'vadodara': {
          name: 'Vadodara',
          localAreas: ['Alkapuri', 'Race Course', 'Fatehgunj', 'Sayajigunj', 'Gotri', 'Akota', 'Manjalpur']
        },
        'rajkot': {
          name: 'Rajkot',
          localAreas: ['Kalawad Road', 'University Road', 'Yagnik Road', 'Mavdi', 'Nana Mauva', 'Race Course']
        }
      }
    },
    'rajasthan': {
      name: 'Rajasthan',
      districts: {
        'jaipur': {
          name: 'Jaipur',
          localAreas: ['MI Road', 'C-Scheme', 'Vaishali Nagar', 'Malviya Nagar', 'Mansarovar', 'Raja Park', 'Tonk Road']
        },
        'jodhpur': {
          name: 'Jodhpur',
          localAreas: ['Ratanada', 'Paota', 'Sardarpura', 'Shastri Nagar', 'Pal Road', 'Chopasni Road']
        },
        'udaipur': {
          name: 'Udaipur',
          localAreas: ['Fateh Sagar', 'Hiran Magri', 'Chetak Circle', 'Sukhadia Circle', 'Ashok Nagar', 'Pratap Nagar']
        },
        'kota': {
          name: 'Kota',
          localAreas: ['Nayapura', 'Talwandi', 'Vigyan Nagar', 'Borkhera', 'DCM', 'Kunhari']
        }
      }
    },
    'kerala': {
      name: 'Kerala',
      districts: {
        'thiruvananthapuram': {
          name: 'Thiruvananthapuram',
          localAreas: ['Statue Junction', 'Kowdiar', 'Pattom', 'Kesavadasapuram', 'Thampanoor', 'Technopark']
        },
        'ernakulam': {
          name: 'Ernakulam',
          localAreas: ['MG Road', 'Panampilly Nagar', 'Edappally', 'Kakkanad', 'Marine Drive', 'Vyttila']
        },
        'kozhikode': {
          name: 'Kozhikode',
          localAreas: ['Palayam', 'Mananchira', 'Mavoor Road', 'Feroke', 'Cherukulam', 'Beach Road']
        },
        'kochi': {
          name: 'Kochi',
          localAreas: ['Fort Kochi', 'Mattancherry', 'Willingdon Island', 'Thoppumpady', 'Jew Town', 'Santa Cruz']
        }
      }
    },
    'west-bengal': {
      name: 'West Bengal',
      districts: {
        'kolkata': {
          name: 'Kolkata',
          localAreas: ['Park Street', 'Salt Lake', 'New Town', 'Ballygunge', 'Alipore', 'Kalighat', 'Bhowanipore', 'Esplanade']
        },
        'north-24-parganas': {
          name: 'North 24 Parganas',
          localAreas: ['Barasat', 'Dum Dum', 'Barrackpore', 'Madhyamgram', 'New Barrackpore', 'Khardaha']
        },
        'south-24-parganas': {
          name: 'South 24 Parganas',
          localAreas: ['Baruipur', 'Diamond Harbour', 'Kakdwip', 'Behala', 'Jadavpur', 'Garia']
        },
        'howrah': {
          name: 'Howrah',
          localAreas: ['Shibpur', 'Belur', 'Liluah', 'Bally', 'Domjur', 'Howrah Maidan']
        }
      }
    },
    'uttar-pradesh': {
      name: 'Uttar Pradesh',
      districts: {
        'lucknow': {
          name: 'Lucknow',
          localAreas: ['Hazratganj', 'Gomti Nagar', 'Alambagh', 'Indira Nagar', 'Aliganj', 'Mahanagar', 'Vikas Nagar']
        },
        'noida': {
          name: 'Gautam Buddha Nagar',
          localAreas: ['Sector 18', 'Sector 62', 'Sector 15', 'Greater Noida', 'Noida Extension', 'Sector 50']
        },
        'ghaziabad': {
          name: 'Ghaziabad',
          localAreas: ['Indirapuram', 'Vaishali', 'Raj Nagar', 'Kaushambi', 'Vasundhara', 'Crossings Republik']
        },
        'varanasi': {
          name: 'Varanasi',
          localAreas: ['Assi Ghat', 'Lanka', 'Godowlia', 'Bhelupur', 'Cantt', 'Sigra', 'Shivpur']
        },
        'kanpur': {
          name: 'Kanpur',
          localAreas: ['Civil Lines', 'Mall Road', 'Kakadeo', 'Kidwai Nagar', 'Swaroop Nagar', 'Harsh Nagar']
        },
        'agra': {
          name: 'Agra',
          localAreas: ['Taj Ganj', 'Sadar Bazaar', 'Civil Lines', 'Dayalbagh', 'Sikandra', 'Kamla Nagar']
        }
      }
    },
    'punjab': {
      name: 'Punjab',
      districts: {
        'chandigarh': {
          name: 'Chandigarh',
          localAreas: ['Sector 17', 'Sector 22', 'Sector 35', 'Sector 43', 'IT Park', 'Industrial Area']
        },
        'ludhiana': {
          name: 'Ludhiana',
          localAreas: ['Model Town', 'Civil Lines', 'Sarabha Nagar', 'Dugri', 'BRS Nagar', 'Pakhowal Road']
        },
        'amritsar': {
          name: 'Amritsar',
          localAreas: ['Golden Temple', 'Hall Bazaar', 'Lawrence Road', 'Ranjit Avenue', 'Green Avenue', 'Model Town']
        },
        'jalandhar': {
          name: 'Jalandhar',
          localAreas: ['Model Town', 'Civil Lines', 'BMC Chowk', 'Rama Mandi', 'Urban Estate', 'Lajpat Nagar']
        }
      }
    },
    'haryana': {
      name: 'Haryana',
      districts: {
        'gurugram': {
          name: 'Gurugram',
          localAreas: ['DLF Phase 1-5', 'Sohna Road', 'Golf Course Road', 'MG Road', 'Sector 29', 'Cyber City', 'Udyog Vihar']
        },
        'faridabad': {
          name: 'Faridabad',
          localAreas: ['Sector 15', 'Surajkund', 'NIT Faridabad', 'Ballabgarh', 'Greater Faridabad', 'BPTP']
        },
        'rohtak': {
          name: 'Rohtak',
          localAreas: ['Model Town', 'Civil Lines', 'Sector 1-14', 'Asthal Bohar', 'Sunaria', 'Madina']
        },
        'panipat': {
          name: 'Panipat',
          localAreas: ['Model Town', 'Sector 13-25', 'GT Road', 'Huda', 'Tehsil Camp', 'Sanoli Road']
        }
      }
    },
    'andhra-pradesh': {
      name: 'Andhra Pradesh',
      districts: {
        'visakhapatnam': {
          name: 'Visakhapatnam',
          localAreas: ['Beach Road', 'MVP Colony', 'Dwaraka Nagar', 'Gajuwaka', 'Rushikonda', 'Seethammadhara']
        },
        'vijayawada': {
          name: 'Vijayawada',
          localAreas: ['Benz Circle', 'Governorpet', 'Labbipet', 'Moghalrajpuram', 'Bhavanipuram', 'Auto Nagar']
        },
        'tirupati': {
          name: 'Tirupati',
          localAreas: ['Tirumala', 'Railway Station', 'Alipiri', 'Tiruchanur', 'Renigunta', 'Tirupati Urban']
        },
        'guntur': {
          name: 'Guntur',
          localAreas: ['Brodipet', 'Lakshmipuram', 'Arundelpet', 'Kothapet', 'Nagarampalem', 'Gorantla']
        }
      }
    },
    'madhya-pradesh': {
      name: 'Madhya Pradesh',
      districts: {
        'bhopal': {
          name: 'Bhopal',
          localAreas: ['MP Nagar', 'Arera Colony', 'New Market', 'Hamidia Road', 'TT Nagar', 'Kolar Road']
        },
        'indore': {
          name: 'Indore',
          localAreas: ['Vijay Nagar', 'Palasia', 'Sapna Sangeeta', 'MG Road', 'Bhawarkuan', 'Rajwada']
        },
        'jabalpur': {
          name: 'Jabalpur',
          localAreas: ['Civil Lines', 'Napier Town', 'Wright Town', 'Adhartal', 'Gorakhpur', 'Vijay Nagar']
        },
        'gwalior': {
          name: 'Gwalior',
          localAreas: ['Lashkar', 'City Center', 'Morar', 'Thatipur', 'Gole Ka Mandir', 'Jayendraganj']
        }
      }
    },
    'bihar': {
      name: 'Bihar',
      districts: {
        'patna': {
          name: 'Patna',
          localAreas: ['Boring Road', 'Kankarbagh', 'Patna Junction', 'Gandhi Maidan', 'Ashok Rajpath', 'Bailey Road']
        },
        'gaya': {
          name: 'Gaya',
          localAreas: ['Bodh Gaya', 'Civil Lines', 'Station Road', 'GB Road', 'Tekari Road', 'Manpur']
        },
        'muzaffarpur': {
          name: 'Muzaffarpur',
          localAreas: ['Mithanpura', 'Brahmpura', 'Saraiyaganj', 'Juran Chapra', 'Motijheel', 'Station Road']
        }
      }
    },
    'odisha': {
      name: 'Odisha',
      districts: {
        'bhubaneswar': {
          name: 'Bhubaneswar',
          localAreas: ['Saheed Nagar', 'Unit 1-9', 'Patia', 'Khandagiri', 'Nayapalli', 'Chandrasekharpur']
        },
        'cuttack': {
          name: 'Cuttack',
          localAreas: ['Buxi Bazar', 'College Square', 'Badambadi', 'Nayasarak', 'Link Road', 'Tulasipur']
        },
        'puri': {
          name: 'Puri',
          localAreas: ['Grand Road', 'Chakratirtha Road', 'CT Road', 'Swargadwar', 'Talabania', 'Baliapanda']
        }
      }
    }
  }
};

// Court Types
export type CourtType = 
  | 'High Court'
  | 'District Court'
  | 'Civil Court'
  | 'Family Court'
  | 'Sessions Court'
  | 'Magistrate Court'
  | 'Consumer Court'
  | 'Labour Court';

export const courtTypes: CourtType[] = [
  'High Court',
  'District Court',
  'Civil Court',
  'Family Court',
  'Sessions Court',
  'Magistrate Court',
  'Consumer Court',
  'Labour Court'
];

// Court Interface
export interface Court {
  id: string;
  name: string;
  type: CourtType;
  address: string;
  state: string;
  stateKey: string;
  district: string;
  districtKey: string;
  localArea: string;
  latitude: number;
  longitude: number;
  phone?: string;
  email?: string;
  timings?: string;
  established?: string;
  jurisdiction?: string;
}

// Sample Court Data for India
export const courtsData: Court[] = [
  // Delhi Courts
  {
    id: 'delhi-hc',
    name: 'Delhi High Court',
    type: 'High Court',
    address: 'Sher Shah Road, ITO, New Delhi - 110503',
    state: 'Delhi',
    stateKey: 'delhi',
    district: 'Central Delhi',
    districtKey: 'central-delhi',
    localArea: 'Daryaganj',
    latitude: 28.6314,
    longitude: 77.2467,
    phone: '011-23386988',
    email: 'hc-delhi@nic.in',
    timings: '10:00 AM - 4:30 PM',
    established: '1966',
    jurisdiction: 'National Capital Territory of Delhi'
  },
  {
    id: 'delhi-saket-dc',
    name: 'Saket District Court Complex',
    type: 'District Court',
    address: 'MB Road, Sector 6, Pushp Vihar, Saket, New Delhi - 110017',
    state: 'Delhi',
    stateKey: 'delhi',
    district: 'South Delhi',
    districtKey: 'south-delhi',
    localArea: 'Saket',
    latitude: 28.5269,
    longitude: 77.2069,
    phone: '011-26856660',
    timings: '10:00 AM - 5:00 PM'
  },
  {
    id: 'delhi-patiala-house',
    name: 'Patiala House Courts',
    type: 'Sessions Court',
    address: 'Patiala House, India Gate, New Delhi - 110001',
    state: 'Delhi',
    stateKey: 'delhi',
    district: 'New Delhi',
    districtKey: 'new-delhi',
    localArea: 'India Gate',
    latitude: 28.6144,
    longitude: 77.2361,
    phone: '011-23383022',
    timings: '10:00 AM - 5:00 PM'
  },
  {
    id: 'delhi-tis-hazari',
    name: 'Tis Hazari Courts',
    type: 'District Court',
    address: 'Tis Hazari, Delhi - 110054',
    state: 'Delhi',
    stateKey: 'delhi',
    district: 'North Delhi',
    districtKey: 'north-delhi',
    localArea: 'Civil Lines',
    latitude: 28.6643,
    longitude: 77.2197,
    phone: '011-23811091',
    timings: '10:00 AM - 5:00 PM'
  },
  {
    id: 'delhi-rohini',
    name: 'Rohini Court Complex',
    type: 'District Court',
    address: 'Sector 14, Rohini, Delhi - 110085',
    state: 'Delhi',
    stateKey: 'delhi',
    district: 'North Delhi',
    districtKey: 'north-delhi',
    localArea: 'GTB Nagar',
    latitude: 28.7152,
    longitude: 77.1141,
    phone: '011-27553838',
    timings: '10:00 AM - 5:00 PM'
  },
  {
    id: 'delhi-dwarka',
    name: 'Dwarka Court Complex',
    type: 'District Court',
    address: 'Sector 10, Dwarka, New Delhi - 110075',
    state: 'Delhi',
    stateKey: 'delhi',
    district: 'West Delhi',
    districtKey: 'west-delhi',
    localArea: 'Dwarka',
    latitude: 28.5836,
    longitude: 77.0329,
    phone: '011-25086767',
    timings: '10:00 AM - 5:00 PM'
  },
  {
    id: 'delhi-karkardooma',
    name: 'Karkardooma Court Complex',
    type: 'District Court',
    address: 'Karkardooma, Shahdara, Delhi - 110092',
    state: 'Delhi',
    stateKey: 'delhi',
    district: 'Shahdara',
    districtKey: 'shahdara',
    localArea: 'Karkardooma',
    latitude: 28.6523,
    longitude: 77.3042,
    phone: '011-22377858',
    timings: '10:00 AM - 5:00 PM'
  },
  {
    id: 'delhi-family-court',
    name: 'Family Court Saket',
    type: 'Family Court',
    address: 'Saket Court Complex, New Delhi - 110017',
    state: 'Delhi',
    stateKey: 'delhi',
    district: 'South Delhi',
    districtKey: 'south-delhi',
    localArea: 'Saket',
    latitude: 28.5275,
    longitude: 77.2072,
    phone: '011-26856685',
    timings: '10:00 AM - 5:00 PM'
  },
  {
    id: 'delhi-consumer-forum',
    name: 'State Consumer Disputes Redressal Commission',
    type: 'Consumer Court',
    address: 'I.P. Estate, ITO, New Delhi - 110002',
    state: 'Delhi',
    stateKey: 'delhi',
    district: 'Central Delhi',
    districtKey: 'central-delhi',
    localArea: 'Daryaganj',
    latitude: 28.6293,
    longitude: 77.2489,
    phone: '011-23379454',
    timings: '10:00 AM - 4:00 PM'
  },
  {
    id: 'delhi-labour-court',
    name: 'Labour Court Complex',
    type: 'Labour Court',
    address: 'Karkardooma Courts, Shahdara, Delhi - 110092',
    state: 'Delhi',
    stateKey: 'delhi',
    district: 'Shahdara',
    districtKey: 'shahdara',
    localArea: 'Karkardooma',
    latitude: 28.6525,
    longitude: 77.3040,
    phone: '011-22377900',
    timings: '10:00 AM - 5:00 PM'
  },

  // Maharashtra Courts
  {
    id: 'bombay-hc',
    name: 'Bombay High Court',
    type: 'High Court',
    address: 'Fort, Mumbai, Maharashtra - 400032',
    state: 'Maharashtra',
    stateKey: 'maharashtra',
    district: 'Mumbai City',
    districtKey: 'mumbai-city',
    localArea: 'Churchgate',
    latitude: 18.9281,
    longitude: 72.8335,
    phone: '022-22026500',
    email: 'hc-bombay@nic.in',
    timings: '10:45 AM - 5:00 PM',
    established: '1862',
    jurisdiction: 'Maharashtra, Goa, Dadra and Nagar Haveli, Daman and Diu'
  },
  {
    id: 'mumbai-sessions',
    name: 'Mumbai City Civil and Sessions Court',
    type: 'Sessions Court',
    address: 'Kala Ghoda, Fort, Mumbai - 400001',
    state: 'Maharashtra',
    stateKey: 'maharashtra',
    district: 'Mumbai City',
    districtKey: 'mumbai-city',
    localArea: 'Churchgate',
    latitude: 18.9296,
    longitude: 72.8313,
    phone: '022-22072220',
    timings: '10:30 AM - 5:00 PM'
  },
  {
    id: 'mumbai-bandra-court',
    name: 'Bandra Court',
    type: 'District Court',
    address: 'Bandra East, Mumbai - 400051',
    state: 'Maharashtra',
    stateKey: 'maharashtra',
    district: 'Mumbai Suburban',
    districtKey: 'mumbai-suburban',
    localArea: 'Bandra',
    latitude: 19.0596,
    longitude: 72.8474,
    phone: '022-26420000',
    timings: '10:30 AM - 5:00 PM'
  },
  {
    id: 'mumbai-andheri-court',
    name: 'Andheri Court',
    type: 'Civil Court',
    address: 'Andheri East, Mumbai - 400069',
    state: 'Maharashtra',
    stateKey: 'maharashtra',
    district: 'Mumbai Suburban',
    districtKey: 'mumbai-suburban',
    localArea: 'Andheri',
    latitude: 19.1136,
    longitude: 72.8697,
    phone: '022-26820000',
    timings: '10:30 AM - 5:00 PM'
  },
  {
    id: 'pune-district-court',
    name: 'Pune District Court',
    type: 'District Court',
    address: 'Shivajinagar, Pune - 411005',
    state: 'Maharashtra',
    stateKey: 'maharashtra',
    district: 'Pune',
    districtKey: 'pune',
    localArea: 'Shivajinagar',
    latitude: 18.5285,
    longitude: 73.8501,
    phone: '020-25521344',
    timings: '10:30 AM - 5:00 PM'
  },
  {
    id: 'pune-family-court',
    name: 'Pune Family Court',
    type: 'Family Court',
    address: 'Shivajinagar, Pune - 411005',
    state: 'Maharashtra',
    stateKey: 'maharashtra',
    district: 'Pune',
    districtKey: 'pune',
    localArea: 'Shivajinagar',
    latitude: 18.5289,
    longitude: 73.8498,
    phone: '020-25521355',
    timings: '10:30 AM - 5:00 PM'
  },
  {
    id: 'nagpur-district-court',
    name: 'Nagpur District Court',
    type: 'District Court',
    address: 'Civil Lines, Nagpur - 440001',
    state: 'Maharashtra',
    stateKey: 'maharashtra',
    district: 'Nagpur',
    districtKey: 'nagpur',
    localArea: 'Civil Lines',
    latitude: 21.1458,
    longitude: 79.0882,
    phone: '0712-2561234',
    timings: '10:30 AM - 5:00 PM'
  },
  {
    id: 'nagpur-hc-bench',
    name: 'Bombay High Court - Nagpur Bench',
    type: 'High Court',
    address: 'Civil Lines, Nagpur - 440001',
    state: 'Maharashtra',
    stateKey: 'maharashtra',
    district: 'Nagpur',
    districtKey: 'nagpur',
    localArea: 'Civil Lines',
    latitude: 21.1461,
    longitude: 79.0887,
    phone: '0712-2562000',
    timings: '10:45 AM - 5:00 PM'
  },

  // Karnataka Courts
  {
    id: 'karnataka-hc',
    name: 'Karnataka High Court',
    type: 'High Court',
    address: 'Ambedkar Veedhi, Bengaluru - 560001',
    state: 'Karnataka',
    stateKey: 'karnataka',
    district: 'Bengaluru Urban',
    districtKey: 'bengaluru-urban',
    localArea: 'Malleshwaram',
    latitude: 12.9778,
    longitude: 77.5879,
    phone: '080-22868500',
    email: 'hc-karnataka@nic.in',
    timings: '10:30 AM - 4:30 PM',
    established: '1884',
    jurisdiction: 'Karnataka'
  },
  {
    id: 'bengaluru-city-court',
    name: 'Bengaluru City Civil Court',
    type: 'Civil Court',
    address: 'Mayo Hall, MG Road, Bengaluru - 560001',
    state: 'Karnataka',
    stateKey: 'karnataka',
    district: 'Bengaluru Urban',
    districtKey: 'bengaluru-urban',
    localArea: 'Indiranagar',
    latitude: 12.9752,
    longitude: 77.5978,
    phone: '080-25588000',
    timings: '10:30 AM - 5:00 PM'
  },
  {
    id: 'bengaluru-sessions',
    name: 'Bengaluru Sessions Court',
    type: 'Sessions Court',
    address: 'Nrupathunga Road, Bengaluru - 560001',
    state: 'Karnataka',
    stateKey: 'karnataka',
    district: 'Bengaluru Urban',
    districtKey: 'bengaluru-urban',
    localArea: 'Malleshwaram',
    latitude: 12.9765,
    longitude: 77.5912,
    phone: '080-22257000',
    timings: '10:30 AM - 5:00 PM'
  },
  {
    id: 'bengaluru-family-court',
    name: 'Bengaluru Family Court',
    type: 'Family Court',
    address: 'Sheshadripuram, Bengaluru - 560020',
    state: 'Karnataka',
    stateKey: 'karnataka',
    district: 'Bengaluru Urban',
    districtKey: 'bengaluru-urban',
    localArea: 'Malleshwaram',
    latitude: 12.9889,
    longitude: 77.5714,
    phone: '080-23461000',
    timings: '10:30 AM - 5:00 PM'
  },
  {
    id: 'mysuru-district-court',
    name: 'Mysuru District Court',
    type: 'District Court',
    address: 'Nazarbad, Mysuru - 570010',
    state: 'Karnataka',
    stateKey: 'karnataka',
    district: 'Mysuru',
    districtKey: 'mysuru',
    localArea: 'Nazarbad',
    latitude: 12.3083,
    longitude: 76.6506,
    phone: '0821-2424100',
    timings: '10:30 AM - 5:00 PM'
  },

  // Tamil Nadu Courts
  {
    id: 'madras-hc',
    name: 'Madras High Court',
    type: 'High Court',
    address: 'High Court Road, Chennai - 600104',
    state: 'Tamil Nadu',
    stateKey: 'tamil-nadu',
    district: 'Chennai',
    districtKey: 'chennai',
    localArea: 'Egmore',
    latitude: 13.0867,
    longitude: 80.2785,
    phone: '044-25361919',
    email: 'hc-madras@nic.in',
    timings: '10:30 AM - 4:45 PM',
    established: '1862',
    jurisdiction: 'Tamil Nadu and Puducherry'
  },
  {
    id: 'chennai-city-civil',
    name: 'Chennai City Civil Court',
    type: 'Civil Court',
    address: 'High Court Campus, Chennai - 600104',
    state: 'Tamil Nadu',
    stateKey: 'tamil-nadu',
    district: 'Chennai',
    districtKey: 'chennai',
    localArea: 'Egmore',
    latitude: 13.0871,
    longitude: 80.2789,
    phone: '044-25361818',
    timings: '10:30 AM - 5:00 PM'
  },
  {
    id: 'chennai-sessions',
    name: 'Chennai Sessions Court',
    type: 'Sessions Court',
    address: 'Egmore, Chennai - 600008',
    state: 'Tamil Nadu',
    stateKey: 'tamil-nadu',
    district: 'Chennai',
    districtKey: 'chennai',
    localArea: 'Egmore',
    latitude: 13.0782,
    longitude: 80.2604,
    phone: '044-28193000',
    timings: '10:30 AM - 5:00 PM'
  },
  {
    id: 'coimbatore-district-court',
    name: 'Coimbatore District Court',
    type: 'District Court',
    address: 'Court Road, Coimbatore - 641018',
    state: 'Tamil Nadu',
    stateKey: 'tamil-nadu',
    district: 'Coimbatore',
    districtKey: 'coimbatore',
    localArea: 'Gandhipuram',
    latitude: 11.0168,
    longitude: 76.9558,
    phone: '0422-2392100',
    timings: '10:30 AM - 5:00 PM'
  },
  {
    id: 'madurai-district-court',
    name: 'Madurai District Court',
    type: 'District Court',
    address: 'High Court Colony, Madurai - 625020',
    state: 'Tamil Nadu',
    stateKey: 'tamil-nadu',
    district: 'Madurai',
    districtKey: 'madurai',
    localArea: 'Anna Nagar',
    latitude: 9.9252,
    longitude: 78.1198,
    phone: '0452-2532100',
    timings: '10:30 AM - 5:00 PM'
  },

  // Telangana Courts
  {
    id: 'telangana-hc',
    name: 'Telangana High Court',
    type: 'High Court',
    address: 'High Court Building, Gachibowli, Hyderabad - 500032',
    state: 'Telangana',
    stateKey: 'telangana',
    district: 'Hyderabad',
    districtKey: 'hyderabad',
    localArea: 'Gachibowli',
    latitude: 17.4255,
    longitude: 78.3507,
    phone: '040-23440100',
    email: 'hc-telangana@nic.in',
    timings: '10:30 AM - 4:30 PM',
    established: '2019',
    jurisdiction: 'Telangana'
  },
  {
    id: 'hyderabad-city-civil',
    name: 'Hyderabad City Civil Court',
    type: 'Civil Court',
    address: 'Nampally, Hyderabad - 500001',
    state: 'Telangana',
    stateKey: 'telangana',
    district: 'Hyderabad',
    districtKey: 'hyderabad',
    localArea: 'Abids',
    latitude: 17.3855,
    longitude: 78.4698,
    phone: '040-24611000',
    timings: '10:30 AM - 5:00 PM'
  },
  {
    id: 'hyderabad-family-court',
    name: 'Hyderabad Family Court',
    type: 'Family Court',
    address: 'Nampally, Hyderabad - 500001',
    state: 'Telangana',
    stateKey: 'telangana',
    district: 'Hyderabad',
    districtKey: 'hyderabad',
    localArea: 'Abids',
    latitude: 17.3851,
    longitude: 78.4701,
    phone: '040-24612000',
    timings: '10:30 AM - 5:00 PM'
  },
  {
    id: 'lb-nagar-court',
    name: 'LB Nagar District Court',
    type: 'District Court',
    address: 'LB Nagar, Hyderabad - 500074',
    state: 'Telangana',
    stateKey: 'telangana',
    district: 'Rangareddy',
    districtKey: 'rangareddy',
    localArea: 'LB Nagar',
    latitude: 17.3485,
    longitude: 78.5508,
    phone: '040-24042000',
    timings: '10:30 AM - 5:00 PM'
  },

  // Gujarat Courts
  {
    id: 'gujarat-hc',
    name: 'Gujarat High Court',
    type: 'High Court',
    address: 'Sola, Ahmedabad - 380060',
    state: 'Gujarat',
    stateKey: 'gujarat',
    district: 'Ahmedabad',
    districtKey: 'ahmedabad',
    localArea: 'SG Highway',
    latitude: 23.0684,
    longitude: 72.5290,
    phone: '079-27547100',
    email: 'hc-gujarat@nic.in',
    timings: '10:45 AM - 5:00 PM',
    established: '1960',
    jurisdiction: 'Gujarat'
  },
  {
    id: 'ahmedabad-city-civil',
    name: 'Ahmedabad City Civil Court',
    type: 'Civil Court',
    address: 'Bhadra, Ahmedabad - 380001',
    state: 'Gujarat',
    stateKey: 'gujarat',
    district: 'Ahmedabad',
    districtKey: 'ahmedabad',
    localArea: 'Navrangpura',
    latitude: 23.0225,
    longitude: 72.5714,
    phone: '079-25506000',
    timings: '10:30 AM - 5:00 PM'
  },
  {
    id: 'ahmedabad-family-court',
    name: 'Ahmedabad Family Court',
    type: 'Family Court',
    address: 'Mirzapur, Ahmedabad - 380001',
    state: 'Gujarat',
    stateKey: 'gujarat',
    district: 'Ahmedabad',
    districtKey: 'ahmedabad',
    localArea: 'Navrangpura',
    latitude: 23.0231,
    longitude: 72.5720,
    phone: '079-25507000',
    timings: '10:30 AM - 5:00 PM'
  },
  {
    id: 'surat-district-court',
    name: 'Surat District Court',
    type: 'District Court',
    address: 'Athwa, Surat - 395001',
    state: 'Gujarat',
    stateKey: 'gujarat',
    district: 'Surat',
    districtKey: 'surat',
    localArea: 'Athwa',
    latitude: 21.1702,
    longitude: 72.8311,
    phone: '0261-2474100',
    timings: '10:30 AM - 5:00 PM'
  },

  // Rajasthan Courts
  {
    id: 'rajasthan-hc-jaipur',
    name: 'Rajasthan High Court - Jaipur Bench',
    type: 'High Court',
    address: 'Jhalana Doongri, Jaipur - 302004',
    state: 'Rajasthan',
    stateKey: 'rajasthan',
    district: 'Jaipur',
    districtKey: 'jaipur',
    localArea: 'Malviya Nagar',
    latitude: 26.8907,
    longitude: 75.8234,
    phone: '0141-2740100',
    email: 'hc-rajasthan@nic.in',
    timings: '10:00 AM - 4:30 PM',
    established: '1949',
    jurisdiction: 'Rajasthan'
  },
  {
    id: 'jaipur-district-court',
    name: 'Jaipur District Court',
    type: 'District Court',
    address: 'Badi Chopar, Jaipur - 302001',
    state: 'Rajasthan',
    stateKey: 'rajasthan',
    district: 'Jaipur',
    districtKey: 'jaipur',
    localArea: 'MI Road',
    latitude: 26.9239,
    longitude: 75.8267,
    phone: '0141-2560200',
    timings: '10:00 AM - 5:00 PM'
  },
  {
    id: 'jodhpur-hc',
    name: 'Rajasthan High Court - Jodhpur',
    type: 'High Court',
    address: 'High Court Road, Jodhpur - 342001',
    state: 'Rajasthan',
    stateKey: 'rajasthan',
    district: 'Jodhpur',
    districtKey: 'jodhpur',
    localArea: 'Ratanada',
    latitude: 26.2389,
    longitude: 73.0243,
    phone: '0291-2433200',
    timings: '10:00 AM - 4:30 PM'
  },

  // Kerala Courts
  {
    id: 'kerala-hc',
    name: 'Kerala High Court',
    type: 'High Court',
    address: 'High Court Junction, Ernakulam - 682031',
    state: 'Kerala',
    stateKey: 'kerala',
    district: 'Ernakulam',
    districtKey: 'ernakulam',
    localArea: 'MG Road',
    latitude: 9.9912,
    longitude: 76.2754,
    phone: '0484-2393900',
    email: 'hc-kerala@nic.in',
    timings: '10:00 AM - 4:15 PM',
    established: '1956',
    jurisdiction: 'Kerala and Lakshadweep'
  },
  {
    id: 'ernakulam-district-court',
    name: 'Ernakulam District Court',
    type: 'District Court',
    address: 'MG Road, Ernakulam - 682011',
    state: 'Kerala',
    stateKey: 'kerala',
    district: 'Ernakulam',
    districtKey: 'ernakulam',
    localArea: 'MG Road',
    latitude: 9.9895,
    longitude: 76.2761,
    phone: '0484-2351400',
    timings: '10:00 AM - 5:00 PM'
  },
  {
    id: 'thiruvananthapuram-dc',
    name: 'Thiruvananthapuram District Court',
    type: 'District Court',
    address: 'Statue Junction, Thiruvananthapuram - 695001',
    state: 'Kerala',
    stateKey: 'kerala',
    district: 'Thiruvananthapuram',
    districtKey: 'thiruvananthapuram',
    localArea: 'Statue Junction',
    latitude: 8.5074,
    longitude: 76.9488,
    phone: '0471-2471100',
    timings: '10:00 AM - 5:00 PM'
  },

  // West Bengal Courts
  {
    id: 'calcutta-hc',
    name: 'Calcutta High Court',
    type: 'High Court',
    address: 'Esplanade Row West, Kolkata - 700001',
    state: 'West Bengal',
    stateKey: 'west-bengal',
    district: 'Kolkata',
    districtKey: 'kolkata',
    localArea: 'Esplanade',
    latitude: 22.5619,
    longitude: 88.3478,
    phone: '033-22625000',
    email: 'hc-calcutta@nic.in',
    timings: '10:30 AM - 4:30 PM',
    established: '1862',
    jurisdiction: 'West Bengal and Andaman and Nicobar Islands'
  },
  {
    id: 'kolkata-city-civil',
    name: 'Kolkata City Civil Court',
    type: 'Civil Court',
    address: 'Bankshall Street, Kolkata - 700001',
    state: 'West Bengal',
    stateKey: 'west-bengal',
    district: 'Kolkata',
    districtKey: 'kolkata',
    localArea: 'Esplanade',
    latitude: 22.5644,
    longitude: 88.3498,
    phone: '033-22439000',
    timings: '10:30 AM - 5:00 PM'
  },
  {
    id: 'alipore-court',
    name: 'Alipore District Court',
    type: 'District Court',
    address: 'Alipore, Kolkata - 700027',
    state: 'West Bengal',
    stateKey: 'west-bengal',
    district: 'Kolkata',
    districtKey: 'kolkata',
    localArea: 'Alipore',
    latitude: 22.5293,
    longitude: 88.3341,
    phone: '033-24791000',
    timings: '10:30 AM - 5:00 PM'
  },

  // Uttar Pradesh Courts
  {
    id: 'allahabad-hc',
    name: 'Allahabad High Court',
    type: 'High Court',
    address: 'High Court Road, Prayagraj - 211001',
    state: 'Uttar Pradesh',
    stateKey: 'uttar-pradesh',
    district: 'Lucknow',
    districtKey: 'lucknow',
    localArea: 'Hazratganj',
    latitude: 25.4358,
    longitude: 81.8463,
    phone: '0532-2422300',
    email: 'hc-allahabad@nic.in',
    timings: '10:00 AM - 5:00 PM',
    established: '1866',
    jurisdiction: 'Uttar Pradesh'
  },
  {
    id: 'lucknow-hc-bench',
    name: 'Allahabad High Court - Lucknow Bench',
    type: 'High Court',
    address: 'Cantt Area, Lucknow - 226001',
    state: 'Uttar Pradesh',
    stateKey: 'uttar-pradesh',
    district: 'Lucknow',
    districtKey: 'lucknow',
    localArea: 'Hazratganj',
    latitude: 26.8467,
    longitude: 80.9462,
    phone: '0522-2207900',
    timings: '10:00 AM - 5:00 PM'
  },
  {
    id: 'lucknow-district-court',
    name: 'Lucknow District Court',
    type: 'District Court',
    address: 'Qaiserbagh, Lucknow - 226001',
    state: 'Uttar Pradesh',
    stateKey: 'uttar-pradesh',
    district: 'Lucknow',
    districtKey: 'lucknow',
    localArea: 'Hazratganj',
    latitude: 26.8523,
    longitude: 80.9318,
    phone: '0522-2623000',
    timings: '10:00 AM - 5:00 PM'
  },
  {
    id: 'noida-district-court',
    name: 'Gautam Buddha Nagar District Court',
    type: 'District Court',
    address: 'Sector 63, Noida - 201301',
    state: 'Uttar Pradesh',
    stateKey: 'uttar-pradesh',
    district: 'Gautam Buddha Nagar',
    districtKey: 'noida',
    localArea: 'Sector 62',
    latitude: 28.6269,
    longitude: 77.3666,
    phone: '0120-2516000',
    timings: '10:00 AM - 5:00 PM'
  },
  {
    id: 'ghaziabad-district-court',
    name: 'Ghaziabad District Court',
    type: 'District Court',
    address: 'NH-24, Ghaziabad - 201001',
    state: 'Uttar Pradesh',
    stateKey: 'uttar-pradesh',
    district: 'Ghaziabad',
    districtKey: 'ghaziabad',
    localArea: 'Raj Nagar',
    latitude: 28.6692,
    longitude: 77.4538,
    phone: '0120-2824000',
    timings: '10:00 AM - 5:00 PM'
  },

  // Punjab & Haryana Courts
  {
    id: 'punjab-haryana-hc',
    name: 'Punjab and Haryana High Court',
    type: 'High Court',
    address: 'Sector 1, Chandigarh - 160001',
    state: 'Punjab',
    stateKey: 'punjab',
    district: 'Chandigarh',
    districtKey: 'chandigarh',
    localArea: 'Sector 17',
    latitude: 30.7553,
    longitude: 76.7911,
    phone: '0172-2740026',
    email: 'hc-punjab-haryana@nic.in',
    timings: '10:00 AM - 4:30 PM',
    established: '1947',
    jurisdiction: 'Punjab, Haryana and Chandigarh'
  },
  {
    id: 'chandigarh-district-court',
    name: 'Chandigarh District Court',
    type: 'District Court',
    address: 'Sector 43, Chandigarh - 160043',
    state: 'Punjab',
    stateKey: 'punjab',
    district: 'Chandigarh',
    districtKey: 'chandigarh',
    localArea: 'Sector 43',
    latitude: 30.7276,
    longitude: 76.7614,
    phone: '0172-2637000',
    timings: '10:00 AM - 5:00 PM'
  },
  {
    id: 'gurugram-district-court',
    name: 'Gurugram District Court',
    type: 'District Court',
    address: 'Civil Lines, Gurugram - 122001',
    state: 'Haryana',
    stateKey: 'haryana',
    district: 'Gurugram',
    districtKey: 'gurugram',
    localArea: 'MG Road',
    latitude: 28.4595,
    longitude: 77.0266,
    phone: '0124-2329000',
    timings: '10:00 AM - 5:00 PM'
  },
  {
    id: 'faridabad-district-court',
    name: 'Faridabad District Court',
    type: 'District Court',
    address: 'Sector 12, Faridabad - 121007',
    state: 'Haryana',
    stateKey: 'haryana',
    district: 'Faridabad',
    districtKey: 'faridabad',
    localArea: 'Sector 15',
    latitude: 28.4089,
    longitude: 77.3178,
    phone: '0129-2417000',
    timings: '10:00 AM - 5:00 PM'
  },

  // Andhra Pradesh Courts
  {
    id: 'andhra-hc',
    name: 'Andhra Pradesh High Court',
    type: 'High Court',
    address: 'Nelapadu, Amaravati - 522237',
    state: 'Andhra Pradesh',
    stateKey: 'andhra-pradesh',
    district: 'Vijayawada',
    districtKey: 'vijayawada',
    localArea: 'Governorpet',
    latitude: 16.5147,
    longitude: 80.5254,
    phone: '0866-2970100',
    email: 'hc-andhra@nic.in',
    timings: '10:30 AM - 5:00 PM',
    established: '2019',
    jurisdiction: 'Andhra Pradesh'
  },
  {
    id: 'visakhapatnam-district-court',
    name: 'Visakhapatnam District Court',
    type: 'District Court',
    address: 'Court Complex, Visakhapatnam - 530001',
    state: 'Andhra Pradesh',
    stateKey: 'andhra-pradesh',
    district: 'Visakhapatnam',
    districtKey: 'visakhapatnam',
    localArea: 'Dwaraka Nagar',
    latitude: 17.7060,
    longitude: 83.2965,
    phone: '0891-2547100',
    timings: '10:30 AM - 5:00 PM'
  },

  // Madhya Pradesh Courts
  {
    id: 'mp-hc-jabalpur',
    name: 'Madhya Pradesh High Court - Jabalpur',
    type: 'High Court',
    address: 'High Court Road, Jabalpur - 482001',
    state: 'Madhya Pradesh',
    stateKey: 'madhya-pradesh',
    district: 'Jabalpur',
    districtKey: 'jabalpur',
    localArea: 'Civil Lines',
    latitude: 23.1681,
    longitude: 79.9246,
    phone: '0761-2623300',
    email: 'hc-madhya-pradesh@nic.in',
    timings: '10:00 AM - 5:00 PM',
    established: '1956',
    jurisdiction: 'Madhya Pradesh'
  },
  {
    id: 'bhopal-district-court',
    name: 'Bhopal District Court',
    type: 'District Court',
    address: 'TT Nagar, Bhopal - 462003',
    state: 'Madhya Pradesh',
    stateKey: 'madhya-pradesh',
    district: 'Bhopal',
    districtKey: 'bhopal',
    localArea: 'TT Nagar',
    latitude: 23.2332,
    longitude: 77.4197,
    phone: '0755-2556000',
    timings: '10:00 AM - 5:00 PM'
  },
  {
    id: 'indore-hc-bench',
    name: 'MP High Court - Indore Bench',
    type: 'High Court',
    address: 'A.B. Road, Indore - 452001',
    state: 'Madhya Pradesh',
    stateKey: 'madhya-pradesh',
    district: 'Indore',
    districtKey: 'indore',
    localArea: 'Palasia',
    latitude: 22.7196,
    longitude: 75.8577,
    phone: '0731-2439100',
    timings: '10:00 AM - 5:00 PM'
  },

  // Bihar Courts
  {
    id: 'patna-hc',
    name: 'Patna High Court',
    type: 'High Court',
    address: 'High Court Road, Patna - 800001',
    state: 'Bihar',
    stateKey: 'bihar',
    district: 'Patna',
    districtKey: 'patna',
    localArea: 'Gandhi Maidan',
    latitude: 25.6093,
    longitude: 85.1376,
    phone: '0612-2223100',
    email: 'hc-patna@nic.in',
    timings: '10:00 AM - 5:00 PM',
    established: '1916',
    jurisdiction: 'Bihar'
  },
  {
    id: 'patna-civil-court',
    name: 'Patna City Civil Court',
    type: 'Civil Court',
    address: 'Gardanibagh, Patna - 800001',
    state: 'Bihar',
    stateKey: 'bihar',
    district: 'Patna',
    districtKey: 'patna',
    localArea: 'Gandhi Maidan',
    latitude: 25.6076,
    longitude: 85.1432,
    phone: '0612-2224000',
    timings: '10:00 AM - 5:00 PM'
  },

  // Odisha Courts
  {
    id: 'orissa-hc',
    name: 'Orissa High Court',
    type: 'High Court',
    address: 'Cuttack - 753002',
    state: 'Odisha',
    stateKey: 'odisha',
    district: 'Cuttack',
    districtKey: 'cuttack',
    localArea: 'Badambadi',
    latitude: 20.4625,
    longitude: 85.8830,
    phone: '0671-2304300',
    email: 'hc-orissa@nic.in',
    timings: '10:00 AM - 4:30 PM',
    established: '1948',
    jurisdiction: 'Odisha'
  },
  {
    id: 'bhubaneswar-district-court',
    name: 'Bhubaneswar District Court',
    type: 'District Court',
    address: 'Khandagiri, Bhubaneswar - 751030',
    state: 'Odisha',
    stateKey: 'odisha',
    district: 'Bhubaneswar',
    districtKey: 'bhubaneswar',
    localArea: 'Khandagiri',
    latitude: 20.2506,
    longitude: 85.7824,
    phone: '0674-2558000',
    timings: '10:00 AM - 5:00 PM'
  }
];

// Helper function to get all states
export const getAllStates = () => {
  return Object.entries(indianLocations.states).map(([key, value]) => ({
    key,
    name: value.name
  }));
};

// Helper function to get districts by state
export const getDistrictsByState = (stateKey: string) => {
  const state = indianLocations.states[stateKey];
  if (!state) return [];
  return Object.entries(state.districts).map(([key, value]) => ({
    key,
    name: value.name
  }));
};

// Helper function to get local areas by district
export const getLocalAreasByDistrict = (stateKey: string, districtKey: string) => {
  const state = indianLocations.states[stateKey];
  if (!state) return [];
  const district = state.districts[districtKey];
  if (!district) return [];
  return district.localAreas;
};

// Helper function to filter courts
export const filterCourts = (
  courts: Court[],
  filters: {
    stateKey?: string;
    districtKey?: string;
    localArea?: string;
    courtType?: CourtType | 'All';
    searchQuery?: string;
  }
) => {
  return courts.filter(court => {
    // State filter
    if (filters.stateKey && filters.stateKey !== 'all' && court.stateKey !== filters.stateKey) {
      return false;
    }
    
    // District filter
    if (filters.districtKey && filters.districtKey !== 'all' && court.districtKey !== filters.districtKey) {
      return false;
    }
    
    // Local area filter
    if (filters.localArea && filters.localArea !== 'all' && court.localArea !== filters.localArea) {
      return false;
    }
    
    // Court type filter
    if (filters.courtType && filters.courtType !== 'All' && court.type !== filters.courtType) {
      return false;
    }
    
    // Search query filter
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      return (
        court.name.toLowerCase().includes(query) ||
        court.address.toLowerCase().includes(query) ||
        court.district.toLowerCase().includes(query) ||
        court.localArea.toLowerCase().includes(query) ||
        court.state.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
};

// Calculate distance between two coordinates (Haversine formula)
export const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};
