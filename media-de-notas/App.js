import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';

const num = (t) => (t.trim() === '' ? NaN : Number(t.replace(',', '.')));
const fmt = (v) => v.toFixed(1).replace('.', ',');

export default function App() {
  const [nome, setNome] = useState('');
  const [n, setN] = useState(['', '', '']);
  const [res, setRes] = useState(null);
  const [erro, setErro] = useState('');

  const setNota = (i, v) => { const c = [...n]; c[i] = v; setN(c); };

  const calcular = () => {
    setRes(null);
    if (nome.trim() === '') return setErro('Informe o nome do aluno.');
    const notas = n.map(num);
    if (notas.some((x) => isNaN(x) || x < 0 || x > 10)) return setErro('Informe as três notas, entre 0 e 10.');
    setErro('');
    const media = notas.reduce((a, b) => a + b, 0) / 3;
    setRes({ media, situacao: media >= 7 ? 'Aprovado' : 'Reprovado' });
  };

  return (
    <View style={s.c}>
      <Text style={s.t}>🎓 Média do aluno</Text>
      <TextInput style={s.i} placeholder="Nome do aluno" value={nome} onChangeText={setNome} />
      {n.map((v, i) => (
        <TextInput key={i} style={s.i} placeholder={`Nota ${i + 1}`} keyboardType="numeric" value={v} onChangeText={(t) => setNota(i, t)} />
      ))}
      <Pressable style={s.b} onPress={calcular}><Text style={s.bt}>Calcular média</Text></Pressable>
      {erro !== '' && <Text style={s.e}>{erro}</Text>}
      {res && (
        <View>
          <Text style={s.r}>Aluno: {nome}</Text>
          <Text style={s.r}>Média: {fmt(res.media)}</Text>
          <Text style={[s.r, { color: res.situacao === 'Aprovado' ? '#1e8449' : '#c0392b' }]}>Situação: {res.situacao}</Text>
        </View>
      )}
    </View>
  );
}

const s = StyleSheet.create({
  c: { flex: 1, padding: 24, paddingTop: 60, backgroundColor: '#f4f6fb' },
  t: { fontSize: 24, fontWeight: 'bold', marginBottom: 16, color: '#1f2a44' },
  i: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccd', borderRadius: 8, padding: 12, marginBottom: 12, fontSize: 16 },
  b: { backgroundColor: '#3b6cf6', padding: 14, borderRadius: 8, alignItems: 'center', marginBottom: 8 },
  bt: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  r: { fontSize: 18, marginTop: 10, color: '#1f2a44', fontWeight: '600' },
  e: { color: '#c0392b', marginTop: 8 },
});