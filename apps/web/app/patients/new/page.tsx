import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function NewPatientPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-xl font-semibold">NewPatient</h1>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" name="fullName" placeholder="Kali Das" autoFocus></Input>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" placeholder="+91 77xxxxxxxx"></Input>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="age">Age</Label>
              <Input id="age" name="age" inputMode="numeric" placeholder="24"></Input>
            </div>
            <div className="flex gap-2">
              <Button type="submit">Save</Button>
              <Button variant="ghost" type="button">
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
