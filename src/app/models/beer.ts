import {Style} from './style';

export class Beer {
  id: string;
  name: string;
  nameDisplay: String;
  description: string;
  abv: string;
  ibu: string;
  glasswareId: number;
  availableId: number;
  styleId: number;
  isOrganic: string;
  labels: Label;
  status: string;
  statusDisplay: string;
  servingTemperature: string;
  servingTemperatureDisplay: string;
  createDate: Date;
  updateDate: Date;
  glass: Glass;
  available: Available;
  style: Style;
}

export class Label {
  icon: string;
  medium: string;
  large: string;
}

export class Glass {
  id: number;
  name: string;
  createDate: Date;
}

class Available {
  id: number;
  name: string;
  description: string;
}
