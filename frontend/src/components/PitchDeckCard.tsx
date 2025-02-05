import { useState, useEffect } from "react";
import axios from "axios";

const PitchDeckCard = ({ id }: { id: number }) => {
  const [pitchDeck, setPitchDeck] = useState<any | null>(null);

  // Fetch the PitchDeck data by ID
  useEffect(() => {
    const fetchPitchDeck = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/ab/1/pitchdecks`);
        const deck = response.data.find((deck: any) => deck.id === id);
        setPitchDeck(deck);
      } catch (error) {
        console.error("Error fetching pitch deck:", error);
      }
    };

    fetchPitchDeck();
  }, [id]);

  if (!pitchDeck) return <div>Loading...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">{pitchDeck?.valuation ? `Pitch Deck ${id}` : `No pitch deck found`}</h2>
      <p className="text-sm text-gray-500">
        <strong>Valuation:</strong> {pitchDeck?.valuation}
      </p>
      <p className="text-sm text-gray-500">
        <strong>Funding:</strong> {pitchDeck?.funding}
      </p>
      <p className="text-sm text-gray-500">
        <strong>Pitch Date:</strong> {pitchDeck?.pitch_date || "Not available"}
      </p>

      {/* Display markdown content */}
      <div className="mt-4">
        <pre className="bg-gray-100 p-4 rounded-md whitespace-pre-wrap">{pitchDeck?.markup || "No markdown content available."}</pre>
      </div>
    </div>
  );
};

export { PitchDeckCard };
