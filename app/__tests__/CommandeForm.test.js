import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import CommandeForm from "../../components/CommandeForm";

// Mock Supabase
jest.mock("../../lib/supabaseClient", () => ({
  supabase: {
    from: () => ({
      insert: jest.fn().mockResolvedValue({ error: null }),
    }),
  },
}));

describe("CommandeForm", () => {
  beforeEach(() => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("soumet une commande valide", async () => {
    render(<CommandeForm />);

    fireEvent.change(screen.getByPlaceholderText("Nom et prénom"), {
      target: { value: "Emna Souissi" },
    });
    fireEvent.change(screen.getByLabelText("Date de commande"), {
      target: { value: "2025-09-21" },
    });
    fireEvent.change(screen.getByPlaceholderText("Type de gâteau"), {
      target: { value: "Anniversaire" },
    });
    fireEvent.change(screen.getByPlaceholderText("Nombre de parts"), {
      target: { value: "10" },
    });

    fireEvent.click(screen.getByText("Enregistrer"));

    // ⏳ Attente que l'alerte soit appelée
    await waitFor(() =>
      expect(window.alert).toHaveBeenCalledWith("✅ Commande enregistrée !")
    );
  });
});
