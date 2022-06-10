#SingleInstance Force
#MaxThreadsPerHotkey 10

SetBatchLines, -1
AutoTrim, Off

AlphaIncrement = 8.5

Ctrl & MButton::
   GetKeyState, ShiftState, Shift
   If ShiftState = U
   {
      Return
   }
   Gosub, WinGetTransparency
   Gosub, WinSetTransparency
   Gosub, ShowTransparencyToolTip
Return

Ctrl & WheelDown::
   GetKeyState, ShiftState, Shift
   If ShiftState = U
   {
      Return
   }
   Gosub, WinGetTransparency
   Trans0 -= 10
   Gosub, WinSetTransparency
   Gosub, ShowTransparencyToolTip
Return

Ctrl & WheelUp::
   GetKeyState, ShiftState, Shift
   If ShiftState = U
   {
      Return
   }
   Gosub, WinGetTransparency
   Trans0 += 10
   Gosub, WinSetTransparency
   Gosub, ShowTransparencyToolTip
Return

WinGetTransparency:
   MouseGetPos, , , WindowID
   If Trans_%WindowID% = 
   {
      Trans_%WindowID% = 100
   }
   StringTrimRight, Trans, Trans_%WindowID%, 0
   Trans0 = %Trans%
Return

WinSetTransparency:
   WinGetClass, WindowClass, ahk_id %WindowID%
   If WindowClass = Progman
   {
      Trans0 = 100
   }
   Else If Trans0 < 10
   {
      Trans0 = 10
   }
   Else If Trans0 > 100
   {
      Trans0 = 100
   }
   a = %Trans%
   b = %Trans0%
   Trans = %Trans0%
   Trans_%WindowID% = %Trans%
   If WindowClass = Progman
   {
      Return
   }
   a *= 2.55
   Alpha0 = %a%				; Starting Alpha
   b *= 2.55
   Alpha = %b%
   Transform, Alpha, Round, %Alpha%	; Ending Alpha
   c = %Alpha0%				; Init iteration var.
   d = %Alpha%
   d -= %Alpha0%			; Range to iterate
   Transform, e, Abs, %d%
   If e > 0
   {
      f = %d%
      f /= %e%				; Unity increment (+/- 1)
   }
   Else
   {
      f = 0
   }
   g = %f%
   g *= %AlphaIncrement%		; Increment
   Loop
   {
      Transform, c, Round, %c%
      WinSet, Trans, %c%, ahk_id %WindowID%
      If c = %Alpha%
      {
         Break
      }
      Else If e >= %AlphaIncrement%
      {
         c += %g%
         e -= %AlphaIncrement%
      }
      Else
      {
         c = %Alpha%
      }
   }
Return

ShowTransparencyToolTip:
   h = %Trans%
   h /= 4
   i = 25
   i -= %h%
   ToolTipText = Opacity :%A_Space%
   Loop, %h%
   {
      ToolTipText = %ToolTipText%|
   }
   If h > 0
   {
      ToolTipText = %ToolTipText%%A_Space%
   }
   ToolTipText = %ToolTipText%%Trans%`%
   If i > 0
   {
      ToolTipText = %ToolTipText%%A_Space%
   }
   Loop, %i%
   {
      ToolTipText = %ToolTipText%|
   }
   ToolTip, %TooltipText%
   MouseGetPos, MouseX0, MouseY0
   SetTimer, RemoveToolTip
Return

RemoveToolTip:
   If A_TimeIdle < 1000
   {
      MouseGetPos, MouseX, MouseY
      If MouseX = %MouseX0%
      {
         If MouseY = %MouseY0%
         {
            Return
         }
      }
   }
   SetTimer, RemoveToolTip, Off
   ToolTip
Return
