/// <reference types="sails" />

import * as Sails from '../sails';

declare global {
  const sails: Sails.Application;
  const Area: Sails.Model;
  const SystemService: {
    reset(): void;
  };
}

export {};
