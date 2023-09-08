type DataTypeValue = {
  name: string;
  value: string | number | boolean;
  type: string;
};

export type DataType = {
  name: string;
  type: string;
  signature: string;
  value: DataTypeValue;
};

export type DecodedData = DataType[];
