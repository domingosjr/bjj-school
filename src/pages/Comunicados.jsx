import { useEffect, useState } from "react";
import { getComunicados } from "../services/MockApi";
import { Typography, Alert, CircularProgress, List, ListItem, ListItemText } from "@mui/material";

export default function Comunicados(){
  const [posts, setPosts] = useState([]), [loading, setLoading] = useState(true), [error, setError] = useState("");

  useEffect(()=>{
    const controller = new AbortController();
    (async ()=>{
      try {
        setLoading(true); setError("");
        const data = await getComunicados(controller.signal);
        setPosts(data.slice(0,20));
      } catch(e){ setError(e.message || "Erro ao carregar"); }
      finally { setLoading(false); }
    })();
    return ()=> controller.abort();
  },[]);

  return (
    <>
      <Typography variant="h4" gutterBottom>Comunicados</Typography>
      {loading && <CircularProgress/>}
      {error && <Alert severity="error" sx={{ my:2 }}>{error}</Alert>}
      {!loading && !error && (
        <List>
          {posts.map(p => (
            <ListItem key={p.id} alignItems="flex-start">
              <ListItemText primary={p.title} secondary={p.body}/>
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
}
