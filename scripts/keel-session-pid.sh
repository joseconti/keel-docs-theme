# shellcheck shell=sh
# Keel v5.15.1 — UNA sola respuesta a «¿quién soy?».
#
# Fichero SOURCEADO, nunca ejecutado. Expone dos funciones:
#   keel_session_pid       — identidad de ESTA sesión (PID + instante de arranque)
#   keel_session_pid_solo  — solo el PID, para lo que necesite comparar procesos
#
# POR QUÉ EXISTE. Todo lo que registra o compara sesiones necesita la misma identidad y necesita que
# sea LA MISMA en todos los scripts: el dueño del carril único, el `launcher-pid` del recibo, el
# testigo, y desde v5.15.0 la sonda de concurrencia del gancho de parada y la clave de su registro
# de bloqueos. En este proyecto ya se calculaba —`sesion_pid()` vivía dentro de
# `scripts/keel-handoff-verify`— pero sin nombre. **Lo que v5.15.1 añade es el NOMBRE**: un ayudante
# que nadie nombra es un ayudante que cada llamante redefine un poco distinto, y tres respuestas
# ligeramente distintas a «quién soy» son exactamente el fallo que esto cierra, un nivel más abajo.
#
# POR QUÉ EL INSTANTE DE ARRANQUE Y NO SOLO EL PID. Los PID se reutilizan. Sin el arranque, un
# proceso nuevo que herede el número de una sesión muerta la SUPLANTA: reclamaría su carril, pasaría
# por dueño de su recibo y satisfaría comprobaciones de concurrencia que debían fallar. El par
# (PID, arranque) no se reutiliza.
#
# El dueño es la SESIÓN del asistente, no el script, que muere en cuanto termina: se busca el
# ancestro más cercano cuyo nombre de proceso coincida con el que declara la FILA de la herramienta
# en la que corre esta sesión (`KEEL_TOOL_SESSION_PROC`, Keel v6.1.0); si no hay fila o no lo hay,
# manda el proceso padre. El nombre no se escribe aquí: un script compartido no lleva el nombre de
# ninguna herramienta en una línea ejecutable.

# Se resuelve UNA vez y en un SUBSHELL, para no pisar las KEEL_TOOL_* que el llamante pueda tener.
_keel_proc_sesion() {
    if [ -z "${KEEL_SESSION_PROC_CACHE+x}" ]; then
        KEEL_SESSION_PROC_CACHE=$(
            _kr=$(git rev-parse --show-toplevel 2>/dev/null)
            [ -n "$_kr" ] && [ -r "$_kr/scripts/keel-tool-row.sh" ] || exit 0
            . "$_kr/scripts/keel-tool-row.sh" 2>/dev/null || exit 0
            keel_tool_row "$_kr" >/dev/null 2>&1 || exit 0
            printf '%s' "${KEEL_TOOL_SESSION_PROC:-}"
        )
    fi
    printf '%s' "${KEEL_SESSION_PROC_CACHE:-}"
}

keel_session_pid_solo() {
    _kproc=$(_keel_proc_sesion)
    if [ -n "$_kproc" ]; then
        _kp=$PPID
        for _ in 1 2 3 4 5 6 7 8; do
            if [ -z "$_kp" ] || [ "$_kp" = "1" ] || [ "$_kp" = "0" ]; then break; fi
            _kc=$(ps -o comm= -p "$_kp" 2>/dev/null)
            case "$_kc" in *"$_kproc"*) printf '%s' "$_kp"; return 0 ;; esac
            _kp=$(ps -o ppid= -p "$_kp" 2>/dev/null | tr -d ' ')
        done
    fi
    printf '%s' "$PPID"
}

keel_session_arranque() {
    ps -o lstart= -p "${1:-$$}" 2>/dev/null | tr -s ' ' | sed 's/^ *//;s/ *$//'
}

# Identidad completa: «<pid>@<arranque>». Estable durante toda la vida del proceso, y distinta de
# la de cualquier proceso futuro que reutilice el número.
keel_session_pid() {
    _kpid=$(keel_session_pid_solo)
    _kini=$(keel_session_arranque "$_kpid")
    if [ -n "$_kini" ]; then
        printf '%s@%s' "$_kpid" "$_kini"
    else
        # Sin `ps` utilizable no se inventa una identidad: se devuelve el PID a secas. Quien compare
        # verá que no lleva arranque y sabrá que la garantía anti-reutilización no aplica aquí.
        printf '%s' "$_kpid"
    fi
}
