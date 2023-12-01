export interface DataIDRecognitionFront {
  id: string;
  id_prob: string;
  name: string;
  name_prob: string;
  dob: string;
  dob_prob: string;
  sex: string;
  sex_prob: string;
  nationality: string;
  nationality_prob: string;
  home: string;
  home_prob: string;
  address: string;
  address_prob: string;
  doe: string;
  doe_prob: string;
  overall_score: string;
  address_entities: {
    province: string;
    district: string;
    ward: string;
    street: string;
  };
  type_new: string;
  type: string;
}

export interface DataIDRecognitionBack {
  religion_prob: string;
  religion: string;
  ethnicity_prob: string;
  ethnicity: string;
  features: string;
  features_prob: string;
  issue_date: string;
  issue_date_prob: string;
  issue_loc_prob: string;
  issue_loc: string;
  type: string;
}
