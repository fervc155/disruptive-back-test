import { Request as ExpressRequest, Response, NextFunction } from 'express';
import { ParamsDictionary, Query } from 'express-serve-static-core';
import * as jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends ExpressRequest {
    user?: any; 
    params: ParamsDictionary;
    body: any; 
    query: Query;
    headers: { [key: string]: string | string[] };
}
