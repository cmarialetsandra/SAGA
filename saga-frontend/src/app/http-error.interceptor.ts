
import {Injectable} from '@angular/core';
import {HttpHandler, HttpRequest, HttpInterceptor, HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';
import {catchError} from 'rxjs/internal/operators';
import swal from'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {
  construct() {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      catchError(error => {
        let errorMessage = '';
        if (error instanceof HttpErrorResponse && error.status == 404) {
            errorMessage = `Client-side error: ${error.message}`;

            this.credencialesIncorrectas();
            return throwError(errorMessage);
        }
      })
    );
  }

  credencialesIncorrectas(){
	const Toast = swal.mixin({
	  toast: true,
	  position: 'top-end',
	  showConfirmButton: false,
	  timer: 5000,
	  timerProgressBar: true,
	  didOpen: (toast) => {
		toast.addEventListener('mouseenter', swal.stopTimer)
		toast.addEventListener('mouseleave', swal.resumeTimer)
	  }
	})

	Toast.fire({
	  icon: 'error',
	  title: 'Credenciales incorrectas'
	})
}
}