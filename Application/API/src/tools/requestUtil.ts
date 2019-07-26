import { Router, Request, Response } from 'express';

export async function getBody(req: Request){
    let data: any[] = [];
    req.on('data', (chunk) => data.push(chunk));
    return new Promise((resolve, reject) => {
        req.on('end', () => resolve(data.join('').toString()));
        req.on('close', () => resolve(data.join('').toString()));
        req.on('error', (err) => reject(err));
    });
}