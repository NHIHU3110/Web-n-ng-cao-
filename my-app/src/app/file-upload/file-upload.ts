import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { finalize, Subscription } from 'rxjs';

@Component({
  selector: 'app-file-upload',
  standalone: false,
  templateUrl: './file-upload.html',
  styleUrl: './file-upload.css'
})
export class FileUpload implements OnInit {
  @Input()
  requiredFileType: any;
  fileName = '';
  uploadProgress: number = 0;
  uploadSub: Subscription = new Subscription();
  files: any[] = []; // List of uploaded files
  selectedFile: File | null = null;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadFiles();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.selectedFile = file;
      this.uploadProgress = 0; // Reset progress
    }
  }

  upload() {
    if (!this.selectedFile) return;

    const formData = new FormData();
    formData.append("image", this.selectedFile);

    const upload$ = this.http.post("/upload", formData, {
      reportProgress: true,
      observe: 'events'
    })
      .pipe(
        finalize(() => {
          this.uploadSub = new Subscription();
          // Keep selection for now or clear it?
          // this.selectedFile = null; 
        })
      );

    this.uploadSub = upload$.subscribe({
      next: (event) => {
        if (event.type == HttpEventType.UploadProgress) {
          this.uploadProgress = Math.round(100 * (event.loaded / event.total!));
        } else if (event.type == HttpEventType.Response) {
          // Upload complete
          console.log("Upload complete:", event.body);
          this.loadFiles(); // Refresh list
        }
      },
      error: (error) => {
        console.error("Upload Error:", error);

        let errorMessage = "Upload Failed!";
        if (error.error && error.error.error) {
          errorMessage += "\nServer Error: " + error.error.error;
        } else if (error.message) {
          errorMessage += "\n" + error.message;
        }

        alert(errorMessage);
        this.reset();
      }
    });
  }

  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.reset();
  }

  reset() {
    this.uploadProgress = 0;
    this.uploadSub = new Subscription();
    this.selectedFile = null;
    this.fileName = '';
  }

  loadFiles() {
    this.http.get<any>('/api/files').subscribe({
      next: (data) => {
        if (data && data.files) {
          this.files = data.files.map((file: any) => {
            // If server provides a full URL, use it, otherwise construct it
            return {
              ...file,
              url: file.url || `http://localhost:3001/image/${file.filename}`
            };
          });
        }
      },
      error: (err) => {
        console.error("Failed to load files:", err);
      }
    });
  }
}
