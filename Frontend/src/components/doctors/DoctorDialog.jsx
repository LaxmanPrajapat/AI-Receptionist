import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import DoctorForm from "./DoctorForm";

export default function DoctorDialog({
  open,
  setOpen,
  doctor,
  isEditing,
  onSave,
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-3xl">

        <DialogHeader>

          <DialogTitle>
            {isEditing ? "Edit Doctor" : "Add Doctor"}
          </DialogTitle>

          <DialogDescription>
            Fill the doctor's information below.
          </DialogDescription>

        </DialogHeader>

        <DoctorForm
          doctor={doctor}
          isEditing={isEditing}
          onSave={onSave}
          onSuccess={() => setOpen(false)}
        />

      </DialogContent>
    </Dialog>
  );
}