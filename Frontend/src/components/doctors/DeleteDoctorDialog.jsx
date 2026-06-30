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
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-3xl">

        <DialogHeader>

          <DialogTitle>
            Add Doctor
          </DialogTitle>

          <DialogDescription>
            Fill the doctor's information below.
          </DialogDescription>

        </DialogHeader>

        <DoctorForm
          onSuccess={() => setOpen(false)}
        />

      </DialogContent>
    </Dialog>
  );
}