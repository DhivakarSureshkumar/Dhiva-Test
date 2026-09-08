/**
 * Test data for CRM prospect creation and credit report workflow
 * Converted from Functionize JSON export
 */

export interface CRMTestDataRow {
  environment: 'staging' | 'qa' | 'production';
  username: string;
  password: string;
  dealership: string;
  firstName: string;
  lastName: string;
  email: string;
  zip: string;
  primaryEmployee: string;
  source: string;
  prospectType: string;
  comments: string;
  ssn: string;
  birthday: string;
  creditBureaus: {
    transUnion: boolean;
    equifax: boolean;
    experian: boolean;
  };
}

export const crmTestData: CRMTestDataRow[] = [
  {
    environment: 'staging',
    username: 'prodAutonationUser', // From fze.project variable
    password: 'prodAutonationPass', // From fze.project variable
    dealership: 'Southeast Motors',
    firstName: 'dynamicRandomFirstName',
    lastName: 'dynamicRandomLastName',
    email: 'random@email.com',
    zip: '10008',
    primaryEmployee: 'Testonly, Quality',
    source: 'Showroom Up',
    prospectType: 'A Drive By',
    comments: 'This is test prospect',
    ssn: '555123456',
    birthday: '26/11/2025',
    creditBureaus: {
      transUnion: true,
      equifax: true,
      experian: true,
    },
  },
];
