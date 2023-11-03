export enum EventTypes {
  CLICK = 'click',
  MOUSE_ENTER = 'mouseenter',
  MOUSE_LEAVE = 'mouseleave',
}

export interface BoundEvents {
  [EventTypes.CLICK]: {
    [key: string]: boolean;
  };
  [EventTypes.MOUSE_ENTER]: {
    [key: string]: boolean;
  };
  [EventTypes.MOUSE_LEAVE]: {
    [key: string]: boolean;
  };
}

export type EventKeys = keyof BoundEvents;