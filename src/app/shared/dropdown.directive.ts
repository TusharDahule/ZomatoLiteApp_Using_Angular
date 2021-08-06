import { Directive, ElementRef, HostBinding, HostListener } from "@angular/core";

@Directive({
  selector:'[appDropdown]'
})
export class DropdownDirective{

  @HostBinding('class.open') isOpen = false;

  constructor(private elementRef: ElementRef){}

/*   If you want to close drop down by clicking only on button
 */  /* @HostListener('click') toggleOpen(){
    this.isOpen = !this.isOpen;
  } */

/*   If you want to close drop down by clicking anywhere
 */

  @HostListener('document:click',['$event']) toggleOpen(event:Event){
    this.isOpen = this.elementRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
}
