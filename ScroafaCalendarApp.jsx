import React, { useState } from "react";
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export default function ScroafaCalendarApp() {
  const [name, setName] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedFatareDate, setSelectedFatareDate] = useState(null);
  const [scroafe, setScroafe] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleFatareDateChange = (date) => {
    setSelectedFatareDate(date);
  };

  const addScroafa = () => {
    if (!name || !selectedDate) return;
    const fatare = new Date(selectedDate);
    fatare.setDate(fatare.getDate() + 114);

    const newScroafa = {
      id: Date.now(),
      name,
      istoric: [
        {
          montare: selectedDate,
          fatare,
        },
      ],
    };

    setScroafe([...scroafe, newScroafa]);
    setName("");
    setSelectedDate(null);
  };

  const addToIstoric = (scroafaId) => {
    if (!selectedDate) return;
    const fatare = new Date(selectedDate);
    fatare.setDate(fatare.getDate() + 114);

    setScroafe(
      scroafe.map((s) =>
        s.id === scroafaId
          ? {
              ...s,
              istoric: [
                ...s.istoric,
                { montare: selectedDate, fatare },
              ],
            }
          : s
      )
    );
    setSelectedDate(null);
  };

  const deleteIstoricEntry = (scroafaId, indexToDelete) => {
    setScroafe(
      scroafe.map((s) =>
        s.id === scroafaId
          ? {
              ...s,
              istoric: s.istoric.filter((_, i) => i !== indexToDelete),
            }
          : s
      )
    );
  };

  const editIstoricEntry = (scroafaId, indexToEdit) => {
    if (!selectedDate || !selectedFatareDate) return;

    setScroafe(
      scroafe.map((s) => {
        if (s.id === scroafaId) {
          const updatedIstoric = [...s.istoric];
          updatedIstoric[indexToEdit] = {
            montare: selectedDate,
            fatare: selectedFatareDate,
          };
          return {
            ...s,
            istoric: updatedIstoric,
          };
        }
        return s;
      })
    );
    setSelectedDate(null);
    setSelectedFatareDate(null);
  };

  return (
    <div className="p-4 grid gap-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold text-center">Calendar Fătare Scroafe</h1>

      <Card>
        <CardContent className="p-4 grid gap-2">
          <Input
            placeholder="Nume scroafă"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Calendar onChange={handleDateChange} value={selectedDate} />
          <Button onClick={addScroafa}>Adaugă scroafă</Button>
        </CardContent>
      </Card>

      {scroafe.length > 0 && (
        <div className="grid gap-4">
          {scroafe.map((scroafa) => (
            <Card key={scroafa.id}>
              <CardContent className="p-4">
                <p><strong>Nume:</strong> {scroafa.name}</p>
                <Calendar onChange={setSelectedDate} value={selectedDate} />
                <p className="mt-2">Selectează data fătării (opțională pentru editare):</p>
                <Calendar onChange={handleFatareDateChange} value={selectedFatareDate} />
                <Button onClick={() => addToIstoric(scroafa.id)} className="my-2">Adaugă în istoric</Button>
                <div className="mt-4">
                  <p className="font-semibold">Istoric montări/fătări:</p>
                  <ul className="list-disc pl-4">
                    {scroafa.istoric.map((item, index) => (
                      <li key={index} className="mb-2">
                        Montare: {format(item.montare, "dd MMMM yyyy")}, Fătare: {format(item.fatare, "dd MMMM yyyy")}
                        <div className="flex gap-2 mt-1">
                          <Button size="sm" onClick={() => editIstoricEntry(scroafa.id, index)}>Editează</Button>
                          <Button size="sm" variant="destructive" onClick={() => deleteIstoricEntry(scroafa.id, index)}>Șterge</Button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}