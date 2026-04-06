import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      let message = 'Something went wrong';

      if (error.status === 0) {
        message = 'Cannot connect to server';
      } if (error.status === 400) {
        message = 'Bad Request: Failed to read request';
      }
      else if (error.status === 401) {
        message = 'Unauthorized';
      } else if (error.status === 403) {
        message = 'Forbidden';
      } else if (error.status === 404) {
        message = 'Not found';
      } else if (error.status === 500) {
        message = 'Server error: ' + error.error?.message || 'An unexpected error occurred on the server';
      } else if (error.status === 413) {
        message = 'Content Too Large: Maximum upload size exceeded';
      } else if(error.status === 415){
        message = 'Unsupported Media Type: Please upload a valid file';
      }

      else if (error.error?.message) {
        message = error.error.message;
      }



      messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: message,
        life: 10000
      });

      return throwError(() => error);
    })
  );
};
