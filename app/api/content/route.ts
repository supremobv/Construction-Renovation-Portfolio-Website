import {getDb} from '../../../db';
import {content} from '../../../db/schema';
import {eq} from 'drizzle-orm';
import {initialContent} from '../../content';
import {getChatGPTUser} from '../../chatgpt-auth';
import {z} from 'zod';
const image=z.string().url().refine(v=>v.startsWith('https://'),'Use an HTTPS image URL');
const str=z.string().trim().min(1).max(5000);
const schema=z.object({brand:str.max(30),projects:z.array(z.object({id:str.max(100),name:str.max(150),category:z.enum(['New builds','Renovations','Interiors']),location:str.max(200),year:str.max(10),area:str.max(50),duration:str.max(100),image,description:str,scope:str})).min(1).max(50),services:z.array(z.object({title:str.max(100),text:str})).min(1).max(10),testimonials:z.array(z.object({quote:str,name:str.max(100),detail:str.max(300)})).min(1).max(20),beforeImage:image,afterImage:image});
export async function GET(){try{const rows=await getDb().select().from(content).where(eq(content.id,'main'));return Response.json(rows.length?JSON.parse(rows[0].data):initialContent,{headers:{'Cache-Control':'no-store'}})}catch{return Response.json({error:'Content storage is temporarily unavailable.'},{status:503})}}
export async function PUT(request:Request){
if(!await getChatGPTUser())return Response.json({error:'Sign in required.'},{status:401});
if(request.headers.get('origin')!==new URL(request.url).origin)return Response.json({error:'Invalid request origin.'},{status:403});
if(Number(request.headers.get('content-length')||0)>250000)return Response.json({error:'Content too large.'},{status:413});
try{const result=schema.safeParse(await request.json());if(!result.success)return Response.json({error:result.error.issues[0]?.message||'Invalid content.'},{status:400});await getDb().insert(content).values({id:'main',data:JSON.stringify(result.data)}).onConflictDoUpdate({target:content.id,set:{data:JSON.stringify(result.data)}});return Response.json({saved:true})}catch{return Response.json({error:'Unable to save content. Please try again.'},{status:503})}}
