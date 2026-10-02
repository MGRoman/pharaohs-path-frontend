import { createFileRoute, Link, Outlet, useMatches } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import { PageIntro } from '@/components/travel/site';
import { articles } from '@/data/content';
export const Route=createFileRoute('/blog')({component:BlogLayout});
function BlogLayout(){const matches=useMatches();if(matches.some(m=>m.routeId==='/blog/$id'))return <Outlet/>;return <div className="subpage"><PageIntro eyebrow="Журнал путешествий" title="Истории и открытия" text="Идеи, советы и истории, которые вдохновляют смотреть на Египет по-новому."/><div className="container blog-grid">{articles.map(a=><article className="blog-card" key={a.id}><Link to="/blog/$id" params={{id:a.id}} className="image-link"><img src={a.image} alt={a.title} loading="lazy"/></Link><div className="meta"><span>{a.category}</span><span>{a.date}</span></div><h2><Link to="/blog/$id" params={{id:a.id}}>{a.title}</Link></h2><p>{a.excerpt}</p><Link to="/blog/$id" params={{id:a.id}} className="text-link">Читать <ArrowUpRight size={15}/></Link></article>)}</div></div>}
